module.exports = {
    routes: [{ // Path defined with a URL parameter
        method: 'GET',
        path: '/wallet/balance',
        handler: 'wallet-management.balance',
        config: {
            /**
              Before executing the find action in the Restaurant.js controller,
              we call the global 'is-authenticated' policy,
              found at ./src/policies/is-authenticated.js.
             */
            policies: ['global::isAuthenticated']
        }

    }]
}
