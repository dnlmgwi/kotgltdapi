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

      ctx.body = {
        data: results,
      };

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

      ctx.body = {
        data: results,
      };

    }
    catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
};
