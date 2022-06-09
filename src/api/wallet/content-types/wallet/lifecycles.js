const { nanoid } = require("nanoid/non-secure");
const { ApplicationError } = require("@strapi/utils").errors;



module.exports = {
    beforeCreate(event) {
        const id = nanoid(9);
        const { data, where, select, populate } = event.params;

        if (data.user === undefined) {
            throw new ApplicationError('Please Assign Wallet to User', 400);
        }

        data.account_id = id;
    },
};