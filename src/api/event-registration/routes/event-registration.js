'use strict';

/**
 * event-registration router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event-registration.event-registration');
