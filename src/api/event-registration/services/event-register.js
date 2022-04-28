module.exports = {
    //TODO: Add Year to Parameter
    register: async (userId, eventId) => {
        //Check if user is registered 
        const isRegistered = await isUserRegistered(userId, eventId);

        //Check if user is deregisted 
        await isUserDeregistered(userId, eventId);

        //Check if event exists
        const event = await eventExists(eventId);

        // await checkMaxParticipants(event.id);

        //if entry is not found, create new entry
        if (!isRegistered) {
            const registerationDetails = await strapi.entityService.create('api::event-registration.event-registration', {
                data: {
                    user: userId,
                    event: event.id,
                },

            });

            return registerationDetails;
        } else {
            throw new RegisteredAlreadyError('User is already registered for this event');
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

async function checkMaxParticipants(eventId) {

    const entry = await strapi.entityService.findOne('api::event.event', eventId, {
        fields: ['id', 'max_participants'],
        populate: {
            event_registrations: {
                fields: ['id'],
            }
        }
    });

    console.log(entry);


    if (entry.event_registrations.length < entry.max_participants) {
        return true;
    } else {
        throw new EventFullError('Max Participants Reached');
    }
}

class EventFullError extends Error {
    constructor(message) {
        super(message);
        this.name = "Event full error";
    }
}

class RegisteredAlreadyError extends Error {
    constructor(message) {
        super(message);
        this.name = "User already registered error";
    }
}