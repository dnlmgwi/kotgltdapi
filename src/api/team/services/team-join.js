module.exports = {
    join: async (inviteCode, userId) => {

        //Check if the invite code is valid
        const team = await validCode(inviteCode);

        //TODO Check if invite exists

        //TODO: Check if user is already in team

        //Check if user has already sent an invite to prevent mulitple invites
        await preventDuplicateInvite(userId);

        //TODO: Add user to the team
        const teamDetails = await JoinTeam(team.id, userId, inviteCode);

        //TODO: Return Invite Details
        return teamDetails;
    },
}

async function preventDuplicateInvite(userId) {

    //Check if invite Exsits
    //TODO: Check if invite is already sent
    const user = await strapi.entityService.findMany('api::invite.invite', {
        fields: ['id', 'claimed'],
        filters: { user: userId },
        populate: { user: true },
    });

    //if user is empty dont throw error
    if (typeof user !== 'undefined' && user.length !== 0) {
        throw new Error(`Pending Invite`); //TODO: Test Error
    }



    return user;
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
        const joinTeam = await strapi.entityService.create('api::invite.invite', {
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

