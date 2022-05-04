module.exports = {
    routes: [{ // Path defined with a URL parameter
        method: 'POST',
        path: '/team/leave',
        handler: 'team-management.leave',
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
        path: '/team/join/:inviteCode',
        handler: 'team-management.join',
        config: {
            /**
              Before executing the find action in the Restaurant.js controller,
              we call the global 'is-authenticated' policy,
              found at ./src/policies/is-authenticated.js.
             */
            policies: ['global::isAuthenticated']
        }
    }, { // Path defined with a URL parameter
        method: 'GET',
        path: '/team',
        handler: 'team-management.team',
        config: {
            /**
              we call the global 'is-authenticated' policy,
              found at ./src/policies/is-authenticated.js.
             */
            policies: ['global::isAuthenticated']
        }
    }, { // Path defined with a URL parameter
        method: 'POST',
        path: '/team/create/:name',
        handler: 'team.create',
        config: {
            /**
              we call the global 'is-authenticated' policy,
              found at ./src/policies/is-authenticated.js.
             */
            policies: ['global::isAuthenticated']
        }
    }, { // Path defined with a URL parameter
        method: 'DELETE',
        path: '/team/delete',
        handler: 'team.delete',
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
