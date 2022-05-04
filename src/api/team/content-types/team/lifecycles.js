const { nanoid } = require("nanoid/non-secure");

module.exports = {
    beforeCreate(event) {
        //URL-friendly symbols
        //https://github.com/ai/nanoid#readme
        const id = nanoid(9);
        const { data, where, select, populate } = event.params;
        data.invite_code = id;
    },
};