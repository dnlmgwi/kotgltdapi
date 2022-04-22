module.exports = {
    routes: [{ // Path defined with a URL parameter
        method: 'POST',
        path: '/team/leave',
        handler: 'team-management.leave',
    }, { // Path defined with a URL parameter
        method: 'POST',
        path: '/team/join/:inviteCode',
        handler: 'team-management.join',
    }, { // Path defined with a URL parameter
        method: 'GET',
        path: '/team',
        handler: 'team-management.team',
    }, { // Path defined with a URL parameter
        method: 'POST',
        path: '/team/create/:name',
        handler: 'team.create',
    },]
}
