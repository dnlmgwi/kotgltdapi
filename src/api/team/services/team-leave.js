module.exports = {
    leave: async (userId) => {

        // Get the users team if team captain they can't leave
        await getTeam(userId);

        //Get User Invite
        const invite = await findInvite(userId);

        //Delete the Invite
        const result = await leaveTeam(invite);

        return result;
    },
}
//Check If User is a Captain
async function getTeam(userId) {
    const team = await strapi.db.query('api::team.team').findOne({
        select: ['id'],
        where: { captain: userId },
    });

    if (team) {
        throw new TeamCaptainError('Captains cannot leave a team');
    }

    return team;
}
//Find Users Invite
async function findInvite(id) {

    const invites = await strapi.entityService.findMany('api::invite.invite', {
        populate: {
            user: {
                fields: ['id'],
                filters: {
                    id: {
                        $eq: id,
                    },
                },
            },
        },
    });

    if (invites.length === 0) {
        throw new TeamNotFoundError(`User hasn't joined a team`); //TODO: Test Error
    } else {
        return invites[0].id;
    }
}
//Delete Invite and Exit Team
async function leaveTeam(inviteId) {

    await strapi.entityService.delete('api::invite.invite', inviteId);

    return {
        'message': `Team Exit Successful`,
    };

}

class TeamCaptainError extends Error {
    constructor(message) {
        super(message);
        this.name = "Captain Error";
    }
}

class TeamNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Team Not Found";
    }
}