const axios = require('axios').default;


class Payment {
    static received = new Payment('received');
    static approved = new Payment('approved');
    static processing = new Payment('processing');
    static rejected = new Payment('rejected');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

module.exports = {

    pay: async (userId, data) => {


        const ticket = await findTicketDetails(userId, data.tran_id);

        const eventDetails = await findEventDetails(ticket.id);

        await receivedPaymentTicket(eventDetails);

        const response = await initialPayment(data.msisdn, eventDetails.event.price, eventDetails.reference, eventDetails.event.name);

        //TODO Change Payment From Processing to initiated

        return response;

    },
}

async function initialPayment(phoneNumber, amount, tran_id, remark) {

    //TODO: Create Wallet on API
    try {
        const response = await axios.post(process.env.MPAMBA_HOST, {
            "msisdn": phoneNumber,
            "amount": amount,
            "receiver_type": process.env.RECEIVER_TYPE,
            "receiver_identifier": process.env.RECEIVER_IDENTIFIER,
            "tran_id": tran_id,
            "remark": remark
        },
            {
                headers: {
                    api_caller: process.env.TNM_API_CALLER,
                    access_token: process.env.TNM_ACCESS_TOKEN,
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(error);
    }

}


async function findEventDetails(ticketId) {
    const ticket_details = await strapi.entityService.findOne('api::event-registration.event-registration', ticketId, {
        fields: ['id', 'deregistered', 'status', 'reference'],
        populate: { event: { fields: ['price', 'name'], } },
    });

    //if deregistered throw Error
    if (ticket_details.deregistered) {
        throw new DeregisteredError();
    }

    //if status is recieved throw Error
    if (ticket_details.status === Payment.received.name) {
        throw new PaymentFufilledError('Payment was already recieved');
    }

    //if status is approved throw Error
    if (ticket_details.status === Payment.approved.name) {
        throw new PaymentFufilledError('Payment was already approved');
    }

    return ticket_details;
}

async function receivedPaymentTicket(eventDetails) {
    const entry = await strapi.entityService.update('api::event-registration.event-registration', eventDetails.id, {
        data: {
            status: Payment.received.name,
        },
    });

    if (typeof entry !== 'undefined' && !entry) {
        throw new ApprovalError();
    }

    return entry;
}

async function findTicketDetails(userId, ticket_reference) {
    const ticket_details = await strapi.db.query('api::event-registration.event-registration').findOne({
        select: ['id'],
        where: { user: userId, reference: ticket_reference },

    });

    if (typeof ticket_details !== 'undefined' && !ticket_details) {
        throw new InvalidReferenceError('Invalid Ticket Reference Provided');
    }

    return ticket_details;
}

class InvalidReferenceError extends Error {
    constructor(message) {
        super(message);
        this.name = "Input Error";
    }
}

class PaymentFufilledError extends Error {
    constructor(message) {
        super(message);
        this.name = "Duplicate Payment Prevented";
    }
}

class DeregisteredError extends Error {
    constructor(message) {
        super(message);
        this.name = "User Deregistered For Event";
    }
}

//TODO Test
class ApprovalError extends Error {
    constructor(message) {
        super(message);
        this.name = "Invalid Reference";
    }
}
