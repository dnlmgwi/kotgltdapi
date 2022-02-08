const { v4: uuidv4 } = require('uuid');

module.exports = {
    //TODO: Add Year to Parameter
    register: async (userId, eventId) => {
        const uuid = uuidv4();
        const timeNow = new Date();
        let registeredAt = timeNow.toISOString();

        //Check if user is registered 
        const isRegistered = await isUserRegistered(userId, eventId);

        //Check if user is deregisted 
        await isUserDeregistered(userId, eventId);

        //Check if event exists
        const event = await eventExists(eventId);



        //if entry is not found, create new entry
        if (!isRegistered) {
            const registerationDetails = await strapi.entityService.create('api::event-registration.event-registration', {
                data: {
                    user: userId,
                    event: event.id,
                    reference: uuid,
                    registered_at: registeredAt,
                },

            });

            return registerationDetails;
        } else {
            throw new Error('User is already registered for this event');
        }

    }

}

async function isUserRegistered(userId, eventId) {
    const isRegistered = await strapi.db.query('api::event-registration.event-registration').findOne({
        select: ['id'],
        where: { user: userId, event: eventId },

    });

    return isRegistered;
}

async function isUserDeregistered(userId, eventId) {
    const isDeregistered = await strapi.db.query('api::event-registration.event-registration').findOne({
        select: ['id', 'deregistered_at'],
        where: { user: userId, event: eventId, deregistered: true, },

    });

    if (isDeregistered) {
        throw new Error('You deregistered for this event on ' + isDeregistered.deregistered_at);
    }

    return isDeregistered;
}

async function eventExists(eventId) {
    const isEvent = await strapi.db.query('api::event.event').findOne({
        select: ['id'],
        where: { id: eventId },
    });

    if (!isEvent) {
        throw new Error('Event does not exist');
    }

    return isEvent;
}



