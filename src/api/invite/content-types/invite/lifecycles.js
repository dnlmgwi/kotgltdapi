module.exports = {
    async afterCreate(event) {

        const { result, params } = event;


        try {

            console.log(result);

            //TODO: Check if invite is already claimed
            const userEmail = await strapi.entityService.findOne('api::invite.invite', result.id, {
                fields: ['id'],
                populate: {
                    user: {
                        fields: ['email'],
                    }
                }
            });

            //TODO Send Email
            console.log(userEmail.user.email);

        } catch (error) {
            console.log(error);
        }
    },


};

