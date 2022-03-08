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
  //Deregister
  leave: async (ctx, next) => {
    try {
      let results = await strapi.service('api::team.team-leave').leave(inviteCode);

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
    try {
      let results = await strapi.service('api::team.team-team').team(inviteCode);

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
