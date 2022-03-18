module.exports = {
    acceptJoin: async (inviteId, userId) => {

        //Check if the team belongs to the user
        const team = await validCode(inviteCode);

        const joinTeam = await JoinTeam(team.id, userId, inviteCode);

        //Check if user is already in team

        //Add user to team

        return joinTeam;
    },
}

async function validCode(inviteCode) {
    const valid_team = await strapi.db.query('api::team.team').findOne({
        select: ['id'],
        where: { invite_code: inviteCode },
    });

    if (!valid_team) {
        throw new Error('Team does not exist');
    }

    return valid_team;
}

async function JoinTeam(id, userId, inviteCode) {
    const entry = await strapi.db.query('api::team.team').findOne({
        where: { id: id },
        select: [

            'id',
            'team_name',

        ],
        populate: {
            'team_members': true
        },
    });

    //Check if team_members lenght is less than 5
    if (entry.team_members.length < 5) {
        //Add user to team

        const joinTeam = await strapi.entityService.create('api::team-join-request.team-join-request', {
            data: {
                invite_code: inviteCode,
                user: userId,
            },
        });

        return {
            'message': 'Invite Sent Successfully',
            'team': entry.team_name,
            'time': joinTeam.createdAt,
        };

    } else {
        throw new Error('Team is Full');
    }

}

