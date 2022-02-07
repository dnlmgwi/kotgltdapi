'use strict';

/**
 * event-registration service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-registration.event-registration');
