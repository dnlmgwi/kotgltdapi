'use strict';

/**
 * A set of functions called "actions" for `teamManagement`
 */

module.exports = {
  join: async (ctx, next) => {
    try {
      ctx.body = 'joining Team';
    } catch (err) {
      ctx.body = err;
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
  myTeam: async (ctx, next) => {
    try {
      ctx.body = 'my team';
    } catch (err) {
      ctx.body = err;
    }
  },
};
