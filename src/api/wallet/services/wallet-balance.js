const axios = require('axios').default;

module.exports = {
    balance: async (userId) => {

        //TODO: Add user to the wallet
        const id = await walletId(userId);

        console.log(id);
        const data = await walletBalance(id.account_id);

        //TODO: Return Balance
        return {
            balance: data.balance
        };
    },
}

async function walletBalance(accountId) {
    //TODO: Create Wallet on API
    try {
        const response = await axios.get(process.env.WALLET_HOST + '/' + accountId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

async function walletId(userId) {
    const walletId = await strapi.db.query('api::wallet.wallet').findOne({
        select: ['id', 'account_id'],
        where: { user: userId },

    });

    if (!walletId) {
        throw new Error('Wallet not found');
    }

    return walletId;
}


