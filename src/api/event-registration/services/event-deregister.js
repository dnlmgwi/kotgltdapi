module.exports = {
    //TODO: Add Year to Parameter
    deregister: async (userId, eventId) => {
        const timeNow = new Date();
        let timeDeregistered = timeNow.toISOString();

        const entry = await strapi.db.query('api::event-registration.event-registration').findOne({
            select: ['id'],
            where: { user: userId, event: eventId },

        });

        const isDeregistered = await strapi.db.query('api::event-registration.event-registration').findOne({
            select: ['id', 'deregistered_at'],
            where: { user: userId, event: eventId, deregistered: true, },

        });

        console.log(isDeregistered);

        if (!entry) {
            throw new Error('User is not registered for this event');
        }

        if (isDeregistered) {
            throw new Error('You deregistered for this event on ' + isDeregistered.deregistered_at);
        }

        const event = await strapi.db.query('api::event.event').findOne({
            select: ['id'],
            where: { id: eventId },

        });

        if (!event) {
            throw new Error('Event does not exist');
        }

        //if entry is not found, create new entry
        if (entry) {
            const deregisterationDetails = await strapi.entityService.update('api::event-registration.event-registration', entry.id, {
                data: {
                    deregistered: true,
                    event: null,
                    deregistered_at: timeDeregistered,
                },

            });

            return deregisterationDetails;
        } else {
            throw new Error('User is already registered for this event');
        }

    }
}