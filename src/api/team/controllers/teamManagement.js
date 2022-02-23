'use strict';

/**
 * A set of functions called "actions" for `teamManagement`
 */

module.exports = {
  join: async (ctx, next) => {
    let inviteCode = ctx.params.inviteCode;
    // const user = ctx.state.user;
    // const currentUser = user.id;

    try {
      let results = await strapi.service('api::team.team-management').join(inviteCode);

      ctx.body = {
        data: results
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
      ctx.body = 'leaving team';
    } catch (err) {
      ctx.body = err;
    }
  },

  team: async (ctx, next) => {
    try {
      ctx.body = 'my team';
    } catch (err) {
      ctx.body = err;
    }
  },
};
