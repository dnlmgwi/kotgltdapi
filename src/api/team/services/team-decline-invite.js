module.exports = {
    declineInvite: async (inviteId, userId) => {

        // Get the users team, if not a captain throw error
        const team = await getTeam(userId);

        console.log(team);

        // Add invite_id to join_request
        const joinTeam = await deline(inviteId);

        //TODO: Send email to user
        //TODO: Check if invite is already claimed
        //TODO: Remove User from the team
        //TODO: Check if user is already in another team

        return joinTeam;
    },
}

async function getTeam(userId) {
    const team = await strapi.db.query('api::team.team').findOne({
        select: ['id'],
        where: { captain: userId },
    });

    console.log('Team: ', team);

    if (!team) {
        throw new Error('User is not a captain');
    }

    return team;
}

async function deline(inviteId) {

    //Check if invite Exsits
    //TODO: Check if invite is already claimed
    const isClaimed = await strapi.entityService.findOne('api::team-join-request.team-join-request', inviteId, {
        fields: ['id'],
    });

    if (!isClaimed) {
        throw new Error(`Invite Not Found`); //TODO: Test Error
    } else {
        //Delete the Invite
        const entry = await strapi.entityService.delete('api::team-join-request.team-join-request', inviteId);

        console.log(entry);
    }

    return {
        'message': `Invite Delined Successfully`,
        // 'team': entry.team_name,
    };

}

