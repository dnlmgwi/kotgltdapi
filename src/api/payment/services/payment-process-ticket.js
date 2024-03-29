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
    processTicket: async (ticketDetails, paymentDetails) => {

        const eventDetails = await findEventRegistrationDetails(ticketDetails.id);
        //TODO Create Invoice
        //TODO Change From Processing to Approved
        const entry = await approveTicket(eventDetails, paymentDetails)

        return entry;
    },
}

async function approveTicket(eventDetails, paymentDetails) {
    const entry = await strapi.entityService.update('api::event-registration.event-registration', eventDetails.id, {
        data: {
            status: Payment.approved.name,
            transaction_id: paymentDetails.transaction_id
        },
    });

    if (typeof entry !== 'undefined' && !entry) {
        throw new ApprovalError();
    }

    return entry;
}

async function findEventRegistrationDetails(ticketId) {
    const ticket_details = await strapi.entityService.findOne('api::event-registration.event-registration', ticketId, {
        fields: ['deregistered', 'status'],
    });

    //if deregistered throw Error
    if (ticket_details.deregistered) {
        throw new DeregisteredError();
    }

    //if status is approved throw Error
    if (ticket_details.status === Payment.approved.name) {
        throw new PaymentFufilledError();
    }

    return ticket_details;
}

class PaymentFufilledError extends Error {
    constructor(message) {
        super(message);
        this.name = "Payment Already Approved";
    }
}

class ApprovalError extends Error {
    constructor(message) {
        super(message);
        this.name = "Invalid Reference";
    }
}

class DeregisteredError extends Error {
    constructor(message) {
        super(message);
        this.name = "User Deregistered For Event";
    }
}
