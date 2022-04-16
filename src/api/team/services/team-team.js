module.exports = {
    team: async (userId) => {
        // Get the users team, if not a captain throw error
        const id = await getTeamID(userId);

        const team = await findTeam(id.id);

        return team;
    }
}

async function getTeamID(userId) {
    const team = await strapi.db.query('api::team.team').findOne({
        select: ['id'],
        where: { captain: userId },
    });

    if (!team) {
        throw new Error('User is not a captain');
    }

    return team;
}

async function findTeam(id) {
    const team = await strapi.entityService.findOne('api::team.team', id, {
        fields: ['id', 'deleted', 'team_name', 'createdAt', 'invite_code', 'deleted_at'],
        populate: {
            team_members: {
                fields: ['id'],
                populate: {
                    user: {
                        fields: ['id', 'username', 'email', 'created_at'],
                        populate: { avatar: { fields: ['id', 'url'] } }
                    },
                },
            },
        },
    });

    if (!team) {
        throw new TeamNotFoundError();
    } else if (team.deleted === true) {
        throw new TeamDeletedError(team.deleted_at);
    }

    return team;

}

class TeamDeletedError extends Error {
    constructor(message) {
        super(message);
        this.name = "Team was deleted";
    }
}

class TeamNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "Team Not Found";
    }
}