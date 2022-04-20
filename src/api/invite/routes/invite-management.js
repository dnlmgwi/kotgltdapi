module.exports = {
    routes: [{ // Path defined with a URL parameter
        method: 'POST',
        path: '/invite/accept/:id',
        handler: 'invite-management.acceptInvite',
    }, { // Path defined with a URL parameter
        method: 'POST',
        path: '/invite/decline/:id',
        handler: 'invite-management.declineInvite',
    },]
}
