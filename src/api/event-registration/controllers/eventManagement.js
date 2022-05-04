'use strict';

/**
 * A set of functions called "actions" for `eventManagement`
 */

module.exports = {
  //Register
  register: async (ctx, next) => {
    let id = ctx.params.id;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::event-registration.event-register').register(currentUser, id);

      //TODO Sanitize All Results
      const sanitizedEntity = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedEntity);
    }
    catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
  //Deregister
  deregister: async (ctx, next) => {
    let id = ctx.params.id;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::event-registration.event-deregister').deregister(currentUser, id);

      //TODO Sanitize All Results
      const sanitizedEntity = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedEntity);
    }
    catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
  //Events User Has Registered to
  userEvents: async (ctx, next) => {
    let id = ctx.params.id;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::event-registration.user-events').userEvents(currentUser);

      //if results is empty, return 404 response
      if (results.length === 0) {
        ctx.notFound('No events found');
      }

      //TODO Sanitize All Results
      const sanitizedEntity = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedEntity);
    }
    catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
};
