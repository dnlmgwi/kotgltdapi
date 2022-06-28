const { ApplicationError } = require("@strapi/utils").errors;
const { customAlphabet } = require('nanoid');
const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz';

module.exports = {
    beforeCreate(event) {
        const id = customAlphabet(alphabet, 9);

        const timeNow = new Date();
        let registeredAt = timeNow.toISOString();
        const { data, where, select, populate } = event.params;

        if (data.user === undefined) {
            throw new ApplicationError('Please Assign User', 400);
        }

        if (data.event === undefined) {
            throw new ApplicationError('Please Select Event', 400);
        }

        data.reference = id();
        data.registered_at = registeredAt;
    },

    async beforeUpdate(event) {
        const { data, where, select, populate } = event.params;

        //TODO Prevent Reassignment
        // if (data.user !== undefined) {
        //     throw new ApplicationError('You cant reassign a user', 400);
        // }
    },
};