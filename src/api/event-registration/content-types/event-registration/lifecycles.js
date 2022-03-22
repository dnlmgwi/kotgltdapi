const { nanoid } = require("nanoid/non-secure");

module.exports = {
    beforeCreate(event) {
        const id = nanoid(9);
        const timeNow = new Date();
        let registeredAt = timeNow.toISOString();
        const { data, where, select, populate } = event.params;

        data.reference = id;
        data.registered_at = registeredAt;
    },
};