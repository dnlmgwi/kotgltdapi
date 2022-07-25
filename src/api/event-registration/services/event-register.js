module.exports = {
    //TODO: Add Year to Parameter
    register: async (userId, eventId) => {

        await userPhoneNumber(userId);
        //Check if user is registered 
        const isRegistered = await isUserRegistered(userId, eventId);

        //Check if user is deregisted 
        await isUserDeregistered(userId, eventId);

        //Check if event exists
        const event = await eventExists(eventId);

        await isUserGenderCorrect(userId, eventId);

        await checkMaxParticipants(event.id);

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



// await strapi.service('api::payment.payment-initiate').pay(currentUser, { tran_id: results.reference, msisdn: '265' + phoneNumber });





async function isUserGenderCorrect(userId, eventId) {

    const eGender = await eventGender(eventId);
    const uGender = await userGender(userId);

    switch (eGender) {
        case 'Woman':
            if (!uGender) throw new Error('Please update your profile with a gender');
            if (uGender !== 'Woman') throw new Error('You are not eligible for this event');
            break;
        case 'Open':
            if (!uGender) throw new Error('Please update your profile with a gender');
            break;
        default:
            break;
    }
}

async function eventGender(eventId) {
    const { gender } = await strapi.db.query('api::event.event').findOne({
        select: ['id', 'gender'],
        where: { id: eventId },
    });

    return gender;
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

async function userGender(userId) {
    const { gender } = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {
        fields: ['id', 'gender'],
        // populate: {
        //     event_registrations: {
        //         fields: ['id'],
        //     }
        // }
    });


    if (!gender) {
        throw new Error('A gender needs to be selected on your profile.');
    }

    return gender;
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

    if (entry.event_registrations.length < entry.max_participants) {
        return true;
    } else {
        throw new EventFullError('Max Participants Reached');
    }
}

async function userPhoneNumber(userId) {
    const { phone_number } = await strapi.entityService.findOne('plugin::users-permissions.user', userId, {
        fields: ['id', 'phone_number'],
        // populate: {
        //     event_registrations: {
        //         fields: ['id'],
        //     }
        // }
    });


    if (!phone_number) {
        throw new Error('Please provide a phone number on your profile');
    }

    return phone_number;
}

class EventFullError extends Error {
    constructor(message) {
        super(message);
        this.name = "Event Full Error";
    }
}

class RegisteredAlreadyError extends Error {
    constructor(message) {
        super(message);
        this.name = "User Already Registered Error";
    }
}