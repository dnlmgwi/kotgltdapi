module.exports = {
    declineJoin: async (inviteId, userId) => {

        // Get the users team, if not a captain throw error
        const team = await getTeam(userId);

        // Add invite_id to join_request
        const joinTeam = await delineInvite(team.id, inviteId);

        //Todo: Send email to user
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

    if (!team) {
        throw new Error('User is not a captain');
    }

    return team;
}

async function delineInvite(teamId, inviteId) {

    //TODO: Check if invite is already claimed
    // const isClaimed = await strapi.entityService.findOne({
    //     select: ['id'],
    //     where: { claimed: false, invite_id: inviteId },
    // });

    // if (!entry) {
    //     throw new Error(entry); //TODO: Test Error
    // }

    const entry = await strapi.entityService.delete('api::team-join-request.team-join-request', inviteId);

    // if (!entry) {
    //     throw new Error(entry); //TODO: Test Error
    // }

    return {
        'message': 'Invite Delined Successfully',
        // 'team': entry.team_name,
    };

}

