'use strict';

/**
 * A set of functions called "actions" for `teamManagement`
 */

module.exports = {
  balance: async (ctx, next) => {
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::wallet.wallet-balance').balance(currentUser);

      //TODO Sanitize All Results
      // const sanitizedEntity = await this.sanitizeOutput(results, ctx);

      ctx.body = {
        data: results,
      };

      // return this.transformResponse(sanitizedEntity);
    }
    catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
  // transfer: async (ctx, next) => {
  //   const user = ctx.state.user;
  //   const currentUser = user.id;

  //   try {

  //     // let results = await strapi.service('api::team.team-leave').leave(currentUser);

  //     //TODO Sanitize All Results
  //     // const sanitizedEntity = await this.sanitizeOutput(results, ctx);

  //     ctx.body = {
  //       data: results,
  //     };

  //     // return this.transformResponse(sanitizedEntity);
  //   }
  //   catch (err) {
  //     //throw bad request
  //     ctx.badRequest(err, err.message);

  //   }
  // },
  // deposit: async (ctx, next) => {

  //   const user = ctx.state.user;
  //   const currentUser = user.id;

  //   try {

  //     // let results = await strapi.service('api::team.team-team').team(currentUser);

  //     //TODO Sanitize All Results
  //     // const sanitizedEntity = await this.sanitizeOutput(results, ctx);

  //     ctx.body = {
  //       data: results,
  //     };

  //     // return this.transformResponse(sanitizedEntity);
  //   }
  //   catch (err) {
  //     //throw bad request
  //     ctx.badRequest(err, err.message);

  //   }
  // },
};
