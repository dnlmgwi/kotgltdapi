module.exports = {
    //TODO: Add Year to Parameter
    eventStatus: async (leagueId) => {
        return 'status';

    }

    //Most Goals Scored

    //Most Goals Conceded

    //Most Sent Off Players

}

//Get all teams in league id
async function getTeamsInLeagueById(leagueId) {
    // Get all Teams
    const league = await strapi.db.query("api::league.league").findOne({
        select: ["id", "name"],
        where: {
            $and: [
                {
                    publishedAt: {
                        $ne: null,
                    },
                }, {
                    id: {
                        $eq: leagueId
                    }
                }
            ],

        },
        populate: {
            teams: {
                select: ["id", "name"],

            },
        },
    });

    if (league === null) {
        throw new Error("League not found");
    }

    return league.teams;
}