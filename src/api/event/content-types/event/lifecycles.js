const { ApplicationError } = require("@strapi/utils").errors;

module.exports = {
    beforeCreate(event) {
        const { data, where, select, populate } = event.params;

        if (data.game === undefined) {
            throw new ApplicationError("Please Select a Game(s)", 400);
        }
    },
};