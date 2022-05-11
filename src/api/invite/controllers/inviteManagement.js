'use strict';

/**
 * A set of functions called "actions" for `teamManagement`
 */

module.exports = {
  acceptInvite: async (ctx, next) => {
    let inviteId = ctx.params.id;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::invite.accept-invite').acceptInvite(inviteId, currentUser);

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
  declineInvite: async (ctx, next) => {
    let inviteId = ctx.params.id;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::invite.decline-invite').declineInvite(inviteId, currentUser);

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
  deleteInvite: async (ctx, next) => {
    let inviteId = ctx.params.id;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {

      let results = await strapi.service('api::invite.delete-invite').deleteInvite(inviteId,currentUser);

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
