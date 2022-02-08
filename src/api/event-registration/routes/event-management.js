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
    path: '/event/status/:id',
    handler: 'event-management.status',
  },]
}
