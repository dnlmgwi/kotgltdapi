const { nanoid } = require("nanoid/non-secure");

module.exports = {
    beforeCreate(event) {
        const id = nanoid(9);
        const { data, where, select, populate } = event.params;

        data.invite_code = id;
    },
};