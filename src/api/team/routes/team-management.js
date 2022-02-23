module.exports = {
    routes: [{ // Path defined with a URL parameter
        method: 'POST',
        path: '/team/leave/:teamId',
        handler: 'team-management.leave',
    }, { // Path defined with a URL parameter
        method: 'POST',
        path: '/team/join/:inviteCode',
        handler: 'team-management.join',
    }, { // Path defined with a URL parameter
        method: 'GET',
        path: '/team/:teamId',
        handler: 'team-management.team',
    },]
}
