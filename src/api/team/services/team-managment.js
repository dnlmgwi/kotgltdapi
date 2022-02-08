module.exports = {
    //TODO: Add Year to Parameter
    leagueTable: async (leagueId) => {
        const teams = await getTeamsInLeagueById(leagueId);
        //TODO: Add Year to Parameter
        return calculateStandings(teams, leagueId);

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

//Calculate League Standings
async function calculateStandings(teams, leagueId) {
    let leaderboard_array = [];
    for (const element in teams) {
        let team_object = {};
        await getTeamResults(teams[element].id, teams[element].name, leagueId).then(
            (result) => {
                team_object.id = teams[element].id;
                team_object.rank = 0;
                team_object.name = result.name;
                team_object.played = result.played;
                team_object.won = result.won;
                team_object.draw = result.draw;
                team_object.lost = result.lost;
                team_object.form = result.form;
                team_object.goalsFor = result.goalsFor;
                team_object.goalsAgainst = result.goalsAgainst;
                team_object.goalDifference = result.goalDifference;
                team_object.points = result.points;
            }
        );

        leaderboard_array.push(team_object);
    }
    //Sort ascending by goal difference
    leaderboard_array.sort(function (a, b) {
        return b.goalDifference - a.goalDifference;
    });

    //Sort ascending order by points
    leaderboard_array.sort(function (a, b) {
        return b.points - a.points;
    });

    //Add rank
    for (let i = 0; i < leaderboard_array.length; i++) {
        leaderboard_array[i].rank = i + 1;
    }

    return leaderboard_array;
}

//Get Team Results by ID, and Season Year
async function getTeamResults(team_id, team_name, leagueId) {
    let win = await getNumberOfMatchesWonByTeamId(team_id, leagueId);
    let draw = await getNumberOfMatchesDrawnByTeamId(team_id, leagueId);
    let lost = await getNumberOfMatchesLostOrForfeitByTeamId(team_id, leagueId);
    let goalsFor = await getNumberOfGoalsScoredByTeamId(team_id, leagueId);
    let goalsAgainst = await getNumberOfGoalsScoredAgainstByTeamId(team_id, leagueId);
    let played = await calcNumberOfMatchesPlayedByTeamId(win, draw, lost);
    let form = await getLastFormByTeamId(team_id, leagueId);

    let team = {
        name: team_name,
        played: played,
        won: win,
        draw: draw,
        lost: lost,
        goalsFor: goalsFor,
        goalsAgainst: goalsAgainst,
        goalDifference: await calculateGoalDifference(goalsFor, goalsAgainst),
        points: await calculatePoints(win, draw),
        form: form
    };
    return team;
}

//Calculate League Table Points
async function calculatePoints(win, draw) {
    let points = 0;
    points = win * 3 + draw;
    return points;
}


//Count Number of Goals Scored By Team
async function getNumberOfGoalsScoredByTeamId(team_id, leagueId) {
    let result = [];
    const entries = await strapi.entityService.findMany("api::goal.goal", {
        select: ["id"],

        filters: {
            type: {
                $ne: 'own_goal',
            }, publishedAt: {
                $ne: null,
            },
        },
        populate: {
            for_team: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: team_id,
                    },
                }
            }, league: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: leagueId,
                    },
                },
            },
        },
    });

    entries.forEach((element) => {
        if (element.for_team !== null && element.league !== null) {
            result.push(element.id);
        }
    });

    return result.length;

}

//Count Number of Goals Scored against Team
async function getNumberOfGoalsScoredAgainstByTeamId(team_id, leagueId) {
    let result = [];
    const entries = await strapi.entityService.findMany("api::goal.goal", {
        select: ["id"],

        filters: {
            $or: [{
                type: {
                    $contains: 'own_goal',
                },
            },
            {
                type: {
                    $ne: 'own_goal',
                },
            },
            ],
            publishedAt: {
                $ne: null,
            },
        },
        populate: {
            against_team: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: team_id,
                    },
                }
            }, league: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: leagueId,
                    },
                },
            },
        },
    });

    entries.forEach((element) => {
        if (element.against_team !== null && element.league !== null) {
            result.push(element.id);
        }
    });

    return result.length;

}


//Calculate Goal Difference
async function calculateGoalDifference(goalsFor, goalsAgainst) {
    let goalDifference = 0;
    goalDifference = goalsFor - goalsAgainst;
    return goalDifference;
}

//Count Matches Played by team
async function calcNumberOfMatchesPlayedByTeamId(win, draw, lost) {
    let played = 0;
    played = win + draw + lost;
    return played;
}

//Count Matches Won by team
async function getNumberOfMatchesWonByTeamId(team_id, leagueId) {
    let result = [];
    const entries = await strapi.entityService.findMany("api::match.match", {
        select: ["id"],
        filters: {
            publishedAt: {
                $ne: null,
            },
        },
        populate: {
            teams: {
                fields: ["id", "result"],
                filters: {
                    result: {
                        $eq: "win",
                    },
                },
                populate: {
                    team: {
                        fields: ["id", "name"],
                        filters: {
                            id: {
                                $eq: team_id,
                            },
                        },
                        populate: {
                            league: {
                                fields: ["id"],
                                filters: {
                                    id: {
                                        $eq: leagueId,
                                    },
                                },
                            },
                        }
                    },
                },
            }, league: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: leagueId,
                    },
                },
            },
        },
    });

    entries.forEach((element) => {
        element.teams.forEach((component) => {
            if (component.team !== null && component.league !== null) {
                if (component.team.league.id == leagueId) {
                    result.push(component.id);
                }
            }
        });
    });

    return result.length;
}

//Count Matches lost by team
async function getNumberOfMatchesLostOrForfeitByTeamId(team_id, leagueId) {
    let result = [];
    // Get all Teams
    const entries = await strapi.entityService.findMany("api::match.match", {
        select: ["id"],
        // filters: {
        //   match_date: {
        //     $contains: ,
        //   }
        // },
        filters: {
            publishedAt: {
                $ne: null,
            },
        },
        populate: {
            teams: {
                fields: ["id", "result"],
                filters: {
                    $or: [{
                        result: {
                            $eq: "lost",
                        },
                    },
                    {
                        result: {
                            $eq: "forfeit",
                        },
                    }
                    ],
                },
                populate: {
                    team: {
                        fields: ["id", "name"],
                        filters: {
                            id: {
                                $eq: team_id,
                            },
                        }, populate: {
                            league: {
                                fields: ["id"],
                                filters: {
                                    id: {
                                        $eq: leagueId,
                                    },
                                },
                            },
                        }
                    },
                },
            }, league: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: leagueId,
                    },
                },
            },
        },
    });

    entries.forEach((element) => {
        element.teams.forEach((component) => {
            if (component.team !== null && component.league !== null) {
                if (component.team.league.id == leagueId) {
                    result.push(component.id);
                }
            }
        });
    });

    return result.length;
}

//Count Matches drawn by team
async function getNumberOfMatchesDrawnByTeamId(team_id, leagueId) {
    let result = [];
    // Get all Teams
    const entries = await strapi.entityService.findMany("api::match.match", {
        select: ["id"],
        // filters: {
        //   match_date: {
        //     $contains: ,
        //   },
        // },
        filters: {
            publishedAt: {
                $ne: null,
            },
        },
        populate: {
            teams: {
                fields: ["id", "result"],
                filters: {
                    result: {
                        $eq: "draw",
                    },

                },
                populate: {
                    team: {
                        fields: ["id", "name"],
                        filters: {
                            id: {
                                $eq: team_id,
                            },

                        }, populate: {
                            league: {
                                fields: ["id"],
                                filters: {
                                    id: {
                                        $eq: leagueId,
                                    },
                                },
                            },
                        }
                    },
                },
            }, league: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: leagueId,
                    },
                },
            },
        },
    });


    entries.forEach((element) => {
        element.teams.forEach((component) => {

            if (component.team !== null && component.league !== null) {
                if (component.team.league.id == leagueId) {
                    result.push(component.id);
                }
            }
        });
    });

    return result.length;
}

//get last 5 matches played by team
async function getLastFormByTeamId(team_id, leagueId) {
    let result = [];
    // Get all Teams
    const entries = await strapi.entityService.findMany("api::match.match", {
        select: ["id"],
        orderBy: [{
            createdAt: 'desc'
        }, {
            publishedAt: 'desc'
        }, {
            match_date: 'desc'
        }],
        limit: 5,
        filters: {
            publishedAt: {
                $ne: null,
            },
        },
        populate: {
            teams: {
                fields: ["id", "result"],
                populate: {
                    team: {
                        fields: ["id", "name"],
                        filters: {
                            id: {
                                $eq: team_id,
                            },
                        }, populate: {
                            league: {
                                fields: ["id"],
                                filters: {
                                    id: {
                                        $eq: leagueId,
                                    },
                                },
                            },
                        }
                    },
                },
            }, league: {
                fields: ["id"],
                filters: {
                    id: {
                        $eq: leagueId,
                    },
                },
            },
        },
    });



    entries.forEach((element) => {
        element.teams.forEach((component) => {
            if (component.team !== null && component.league !== null) {
                if (component.team.league.id == leagueId) {
                    result.push(component.result);
                }
            }
        });
    });

    //Most Recent Result First
    return result.reverse();
}