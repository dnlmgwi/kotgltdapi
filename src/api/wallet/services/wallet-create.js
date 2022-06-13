const axios = require('axios').default;

module.exports = {
    create: async () => {

        //TODO: Add user to the wallet
        const walletDetails = await createWallet();

        //TODO: Return Invite Details
        return walletDetails;
    },
}

async function createWallet() {
    //TODO: Create Wallet on API
    try {
        const response = await axios.post(process.env.WALLET_HOST);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}



