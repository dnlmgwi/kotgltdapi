const { ApplicationError } = require("@strapi/utils").errors;



module.exports = {
    async beforeCreate(event) {
        const { data, where, select, populate } = event.params;

        if (data.user === undefined) {
            throw new ApplicationError('Please Assign Wallet to User', 400);
        }

        await preventWalletReassignment(data.user);

        try {
            const wallet = await strapi.service('api::wallet.wallet-create').create();
            data.account_number = wallet.accountNumber;
            data.account_id = wallet.id;
        } catch (error) {
            throw new ApplicationError(error, 400);
        }
    },

    async beforeUpdate(event) {
        const { data, where, select, populate } = event.params;

        if (data.user !== undefined) {
            throw new ApplicationError('You cant reassign a wallet', 400);
        }
    },
};

async function preventWalletReassignment(userId) {

    //Using UserID find the invite id
    const invites = await strapi.db.query('api::wallet.wallet').findMany({
        select: ['id'],
        where: {
            user: {
                id: userId,
            }
        },
    });

    //if no invite throw error
    if (invites.length !== 0) {
        throw new ApplicationError("User Already Assigned to Wallet", 400);
    }

}