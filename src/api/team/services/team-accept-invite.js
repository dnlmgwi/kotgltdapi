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

    const inviteEntry = await findInvite(id, inviteId)

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

async function findInvite(id, inviteId) {
    const entry = await strapi.entityService.findOne('api::team-join-request.team-join-request', inviteId, {
        fields: ['id'],
        filters: { team: id },
    });

    if (!entry) {
        throw new Error('Invite Not Found');
    }

    return entry;

}

