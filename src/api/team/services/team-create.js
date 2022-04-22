module.exports = {
    create: async (name, userId) => {
        //TODO: Check if user is already a captain
        //Check if user has already sent an invite to prevent mulitple invites
        await preventDuplicateTeamCaptains(userId);

        //TODO: Add user to the team
        const teamDetails = await CreateTeam(name, userId);

        //TODO: Return Invite Details
        return teamDetails;
    },
}

async function preventDuplicateTeamCaptains(userId) {

    //Check if invite Exsits
    //TODO: Check if invite is already sent
    const user = await strapi.entityService.findMany('api::team.team', {
        fields: ['id', 'team_name'],
        filters: { captain: userId },
        populate: { captain: true },
    });

    //if user is empty dont throw error
    if (user.length !== 0) {
        throw new Error(`You have already created a team`); //TODO: Test Error
    }

    return user;
}

async function CreateTeam(name, userId) {

    const team = await strapi.entityService.create('api::team.team', {
        data: {
            team_name: name,
            captain: userId,
        },
    });

    return {
        'message': 'Team created successfully',
        'team': team.team_name,
        'time': team.createdAt,
    };

}

