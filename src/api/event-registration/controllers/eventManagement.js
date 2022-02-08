'use strict';

/**
 * A set of functions called "actions" for `eventManagement`
 */

module.exports = {
  //Register
  register: async (ctx, next) => {
    let id = ctx.params.id;
    // const user = ctx.state.user;
    // const currentUser = user.id;
    // console.log(currentUser);

    try {
      let results = await strapi.service('api::event-registration.event-register').register("1", "1");

      ctx.body = {
        data: results
      };

    } catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
  //Deregister
  deregister: async (ctx, next) => {
    let id = ctx.params.id;
    // const user = ctx.state.user;
    // const currentUser = user.id;
    // console.log(currentUser);

    try {
      let results = await strapi.service('api::event-registration.event-deregister').deregister("1", "1");

      ctx.body = {
        data: results
      };

    } catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
  //Status
  status: async (ctx, next) => {
    try {
      ctx.body = 'status checked';
    } catch (err) {
      ctx.body = err;
    }
  },
};
