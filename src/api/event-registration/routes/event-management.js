module.exports = {
  routes: [{ // Path defined with a URL parameter
    method: 'POST',
    path: '/event/register/:id',
    handler: 'event-management.register',
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
    path: '/event/deregister/:id',
    handler: 'event-management.deregister',
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
    path: '/user/events',
    handler: 'event-management.userEvents',
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
