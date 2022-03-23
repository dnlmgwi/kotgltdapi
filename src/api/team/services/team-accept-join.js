module.exports = {
    acceptJoin: async (inviteId, userId) => {

        // Get the users team, if not a captain throw error
        const team = await getTeam(userId);

        // Add invite_id to join_request
        const joinTeam = await JoinTeam(team.id, inviteId);

        //Todo: Send email to user
        //TODO: Check if invite is already claimed
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

async function JoinTeam(id, inviteId) {

    const entry = await strapi.entityService.update('api::team-join-request.team-join-request', inviteId, {

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

