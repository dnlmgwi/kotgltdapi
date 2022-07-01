'use strict';

/**
 * A set of functions called "actions" for `paymentManagement`
 */

module.exports = {
  //Callback Url
  callback: async (ctx, next) => {
    let data = ctx.request.body;
    try {

      console.log(data);

      let results = await strapi.service('api::payment.payment-store').store(data);

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
  //Payment Url
  pay: async (ctx, next) => {
    let data = ctx.request.body;
    const user = ctx.state.user;
    const currentUser = user.id;


    try {

      let results = await strapi.service('api::payment.payment-initiate').pay(currentUser, data);

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
  }
};
