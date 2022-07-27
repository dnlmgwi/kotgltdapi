'use strict';
// const { sanitizeEntity } = require('strapi-utils'); //TODO Sanitize Endpoints
/**
 * A set of functions called "actions" for `teamManagement`
 */

module.exports = {
  join: async (ctx, next) => {
    let inviteCode = ctx.params.inviteCode;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::team.team-join').join(inviteCode, currentUser);

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
  leave: async (ctx, next) => {
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::team.team-leave').leave(currentUser);

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
  team: async (ctx, next) => {

    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::team.team-team').team(currentUser);

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
};
