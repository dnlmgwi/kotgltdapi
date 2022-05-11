module.exports = {
    routes: [
        { // Accept Invite
            method: 'POST',
            path: '/invite/accept/:id',
            handler: 'invite-management.acceptInvite',
            config: {
                /**
                  Before executing the find action in the Restaurant.js controller,
                  we call the global 'is-authenticated' policy,
                  found at ./src/policies/is-authenticated.js.
                 */
                policies: ['global::isAuthenticated']
            }
        },
        { // Decline Invite
            method: 'POST',
            path: '/invite/decline/:id',
            handler: 'invite-management.declineInvite',
            config: {
                /**
                  Before executing the find action in the Restaurant.js controller,
                  we call the global 'is-authenticated' policy,
                  found at ./src/policies/is-authenticated.js.
                 */
                policies: ['global::isAuthenticated']
            }
        },
        { // Delete Invite
            method: 'POST',
            path: '/invite/delete/:id',
            handler: 'invite-management.deleteInvite',
            config: {
                /**
                  Before executing the find action in the Restaurant.js controller,
                  we call the global 'is-authenticated' policy,
                  found at ./src/policies/is-authenticated.js.
                 */
                policies: ['global::isAuthenticated']
            }
        },]
}
