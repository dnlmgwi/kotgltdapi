module.exports = {
    routes: [{ // Path defined with a URL parameter
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
    }, { // Path defined with a URL parameter
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
    },]
}
