'use strict';

/**
 *  team controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::team.team', ({ strapi }) => ({
    async create(ctx) {
        const name = ctx.params.name;
        const user = ctx.state.user;
        const currentUser = user.id;

        try {
            let results = await strapi.service('api::team.team-create').create(name, currentUser);

            //TODO Sanitize All Results
            const sanitizedEntity = await this.sanitizeOutput(results, ctx);

            return this.transformResponse(sanitizedEntity);
        }
        catch (err) {
            //throw bad request
            ctx.badRequest(err, err.message);

        }
    },

    async delete(ctx) {
        const user = ctx.state.user;
        const currentUser = user.id;

        try {

            let results = await strapi.service('api::team.team-delete').delete( currentUser);

            //TODO Sanitize All Results
            const sanitizedEntity = await this.sanitizeOutput(results, ctx);

            return this.transformResponse(sanitizedEntity);
        }
        catch (err) {
            //throw bad request
            ctx.badRequest(err, err.message);

        }
    }
}));