const { v4: uuidv4 } = require('uuid');

module.exports = {
    //TODO: Add Year to Parameter
    register: async (userId, eventId) => {
        const uuid = uuidv4();
        const timeNow = new Date();
        let timeRegistered = timeNow.toISOString();

        const entry = await strapi.db.query('api::event-registration.event-registration').findOne({
            select: ['id'],
            where: { user: userId, event: eventId },

        });

        const isDeregistered = await strapi.db.query('api::event-registration.event-registration').findOne({
            select: ['id', 'deregistered_at'],
            where: { user: userId, event: eventId, deregistered: true, },

        });

        const event = await strapi.db.query('api::event.event').findOne({
            select: ['id'],
            where: { id: eventId },

        });

        if (!event) {
            throw new Error('Event does not exist');
        }

        if (isDeregistered) {
            throw new Error('You deregistered for this event on ' + isDeregistered.deregistered_at);
        }

        //if entry is not found, create new entry
        if (!entry) {
            const registerationDetails = await strapi.entityService.create('api::event-registration.event-registration', {
                data: {
                    user: userId,
                    event: eventId,
                    reference: uuid,
                    registered_at: timeRegistered,
                },

            });

            return registerationDetails;
        } else {
            throw new Error('User is already registered for this event');
        }

    }

}