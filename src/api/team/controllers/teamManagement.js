'use strict';

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

      ctx.body = {
        data: results,
      };

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

      ctx.body = {
        data: results,
      };

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

      ctx.body = {
        data: results,
      };

    }
    catch (err) {
      //throw bad request
      ctx.badRequest(err, err.message);

    }
  },
  acceptInvite: async (ctx, next) => {
    let inviteCode = ctx.params.inviteId;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {
      let results = await strapi.service('api::team.team-accept-invite').acceptInvite(inviteCode, currentUser);

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
    let inviteId = ctx.params.inviteId;
    const user = ctx.state.user;
    const currentUser = user.id;

    try {
      let results = await strapi.service('api::team.team-decline-invite').declineInvite(inviteId, currentUser);

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
