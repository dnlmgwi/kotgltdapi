const { customAlphabet } = require('nanoid');

module.exports = {
    beforeCreate(event) {
        //URL-friendly symbols
        //https://github.com/ai/nanoid#readme
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const id = customAlphabet(alphabet, 10);


        const { data, where, select, populate } = event.params;

        data.invite_code = id;
    },
};