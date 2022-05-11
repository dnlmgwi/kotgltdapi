module.exports = {
    deleteInvite: async (inviteId, userId) => {
        //if invite is claimed you cant deleteiit
        //if invite is not claimed delete invite
        //Find the Invite
        const id = await findInvite(inviteId, userId);
        const result = await deleteTheInvite(id);
        //TODO: Send email to user
        return result;
    },
}


async function findInvite(inviteId, userId) {

    //Using UserID find the invite id
    const invites = await strapi.db.query('api::invite.invite').findMany({
        select: ['id', 'claimed'],
        where: {
            $and: [
                {
                    user: {
                        id: userId,
                    }
                },
                {
                    id: inviteId,
                },
            ],

        },
    });

    //if no invite throw error
    if (invites.length === 0) {
        throw new InviteNotfoundError('No Invite Found'); //TODO: Test Error
    }

    //Check if invite is already claimed
    if (invites[0].claimed === true) {
        throw new InviteClaimedError('Invite Already Claimed'); //TODO: Test Error
    } else {
        return invites[0].id;
    }

}

async function deleteTheInvite(inviteId) {

    //Delete the Invite
    await strapi.entityService.delete('api::invite.invite', inviteId);


    return {
        'message': `Invite Deleted Successfully`,
    };

}

class InviteNotfoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Invite Not Found Error";
    }
}

class InviteClaimedError extends Error {
    constructor(message) {
        super(message);
        this.name = `Invite Claimed Error`;
    }
}