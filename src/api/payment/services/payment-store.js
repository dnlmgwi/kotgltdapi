module.exports = {
    store: async (result) => {

        const entry = await findDetails(result.external_ref);

        await storeResult(result, entry);

        // if (!result.result_code) { //TODO result.result_code == "200"
        // const ticket = await findTicketDetails(userId, data.tran_id);

        const ticketDetails = await findTicketDetails(result.external_ref);

        //Edit Ticket Status
        await strapi.service('api::payment.payment-process-ticket').processTicket(ticketDetails, result);
        // }

        return result.result_code;
    },
}

async function storeResult(result, entry) {

    const dateTime = new Date(result.result_time);

    await strapi.entityService.create('api::payment.payment', {
        data: {
            conversation_id: result.conversation_id,
            result_code: result.result_code,
            result_desc: result.result_desc,
            transaction_id: result.transaction_id,
            external_ref: result.external_ref,
            result_time: dateTime,
            user: entry.user.id,
            event: entry.event.id
        },
    });

    return result;
}

async function findTicketDetails(ticketRef) {
    const ticket_details = await strapi.entityService.findMany('api::event-registration.event-registration', {
        fields: ['id', 'deregistered', 'status'],
        filters: {
            reference: {
                $eq: ticketRef,
            },
        },
    });

    //if team is empty dont throw error
    if (ticket_details.length === 0) {
        throw new Error(`Ticket Not Found`); //TODO: Test Error
    }


    //if deregistered throw Error
    if (ticket_details[0].deregistered) {
        throw new DeregisteredError('');
    }

    //if status is approved throw Error
    if (ticket_details[0].status === 'approved') {
        throw new PaymentFufilledError('Payment was already approved');
    }

    return ticket_details[0];
}

async function findDetails(ticketRef) {

    const entry = await strapi.entityService.findMany('api::event-registration.event-registration', {
        fields: ['id'],
        filters: {
            reference: {
                $eq: ticketRef,
            },
        },
        populate: {
            user: {
                fields: ['id'],
            },
            event: {
                fields: ['id'],
            }
        },
    });

    //if no invite throw error
    if (entry.length === 0) {
        throw new NotfoundError('No Entry Found'); //TODO: Test Error
    }

    return entry[0];
}

class NotfoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Invite Not Found Error";
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
