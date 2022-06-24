const { ApplicationError } = require("@strapi/utils").errors;
const { customAlphabet } = require('nanoid');
const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';

module.exports = {
    beforeCreate(event) {
        //URL-friendly symbols
        //https://github.com/ai/nanoid#readme
        const id = customAlphabet(alphabet, 10);
        const { data, where, select, populate } = event.params;
        data.invite_code = id();

        if (data.captain === undefined) {
            throw new ApplicationError('Please Assign Team Captain', 400);
        }
    },
};