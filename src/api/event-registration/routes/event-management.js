module.exports = {
  routes: [{ // Path defined with a URL parameter
    method: 'POST',
    path: '/event/register/:id',
    handler: 'event-management.register',
  }, { // Path defined with a URL parameter
    method: 'POST',
    path: '/event/deregister/:id',
    handler: 'event-management.deregister',
  }, { // Path defined with a URL parameter
    method: 'GET',
    path: '/user/events',
    handler: 'event-management.userEvents',
  },]
}
