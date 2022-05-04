const { customRandom, urlAlphabet } = require('nanoid')

module.exports = {
    beforeCreate(event) {
        //URL-friendly symbols
        //https://github.com/ai/nanoid#readme
        const id = customRandom(urlAlphabet, 10, random)
        const { data, where, select, populate } = event.params;

        data.invite_code = id;
    },
};