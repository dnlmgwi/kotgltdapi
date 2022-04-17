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
        method: 'POST',
        path: '/team/accept/:inviteId',
        handler: 'team-management.acceptInvite',
    }, { // Path defined with a URL parameter
        method: 'POST',
        path: '/team/decline/:inviteId',
        handler: 'team-management.declineInvite',
    }, { // Path defined with a URL parameter
        method: 'GET',
        path: '/team',
        handler: 'team-management.team',
    },]
}
