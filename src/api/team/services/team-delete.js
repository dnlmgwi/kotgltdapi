module.exports = {
    delete: async (teamId, userId) => {
        //TODO: Check if user is already a captain
        //Check if user has already sent an invite to prevent mulitple invites
        const team = await findTeam(userId);
        //TODO: Delete all invites to team
        const result = await DeleteTeam(team.id);
        //TODO: Return Invite Details
        return result;
    },
}

//TODO: Delete all invites to team

async function findTeam(userId) {
    //TODO: Check if user has a team is already
    const team = await strapi.entityService.findMany('api::team.team', {
        fields: ['id', 'team_name'],
        filters: { captain: userId },
        populate: { captain: true },
    });

    //if team is empty dont throw error
    if (team.length === 0) {
        throw new Error(`You don't have a team`); //TODO: Test Error
    }

    //TODO: Return Team Details
    return team[0];
}

//TODO Delete Team
async function DeleteTeam(teamId) {

    //TODO: Change Deleted to true and Add DeletedAt Time
    //TODO: Remove Team Captain
    const dateTime = new Date();
    let dateTimeString = dateTime.toISOString();

    const entry = await strapi.entityService.update('api::team.team', teamId, {
        data: {
            deleted: true,
            captain: null,
            deleted_at: dateTimeString,
        },
    });

    console.log(entry);

    return {
        'message': 'Team Deleted Successfully',
        'team': entry.deleted_at,
    };

}

