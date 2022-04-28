module.exports = {
    acceptInvite: async (inviteId, userId) => {

        // Get the users team, if not a captain throw error
        const team = await getTeam(userId);

        // Add invite_id to join_request
        const joinTheTeam = await joinTeam(team.id, inviteId);

        //TODO: Send email to user
        //TODO: Check if invite is already claimed
        //TODO: Check if user is already in another team

        return joinTheTeam;
    },
}

async function getTeam(userId) {
    const team = await strapi.db.query('api::team.team').findOne({
        select: ['id'],
        where: { captain: userId },
    });



    if (!team) {
        throw new Error('User is not a captain');
    }

    return team;
}

async function joinTeam(id, inviteId) {

    await findInvite(id, inviteId)

    const entry = await strapi.entityService.update('api::invite.invite', inviteId, {

        data: {
            team: id,
            claimed: true
        },
    });

    return {
        'message': 'Invite Accepted Successfully',
        'team': entry.team_name,
    };

}

async function findInvite(id, inviteId) {

    //TODO: Check if invite is already claimed
    const isClaimed = await strapi.entityService.findOne('api::invite.invite', inviteId, {
        fields: ['id', 'claimed'], //Check if invite is already claimed
        filters: { team: id },
    });

    if (!isClaimed) {
        throw new Error(`Invite Not Found`); //TODO: Test Error
    } else if (isClaimed.claimed === true) {
        throw new Error(`Invite Already Claimed`); //TODO: Test Error
    }

    return isClaimed;

}

