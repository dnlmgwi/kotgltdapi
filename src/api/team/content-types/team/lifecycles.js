const { nanoid } = require("nanoid/non-secure");
const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
    beforeCreate(event) {
        //URL-friendly symbols
        //https://github.com/ai/nanoid#readme
        const id = nanoid(9);
        const { data, where, select, populate } = event.params;
        data.invite_code = id;

        if (data.user === undefined) {
            throw new ApplicationError('Please Assign Team Captain', 400);
        }
    },
};