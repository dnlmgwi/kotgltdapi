module.exports = ({
  env
}) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER'),
        },
        delete: {},
      },
    },
  },
  publisher: {
    enabled: true,
  },
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: { origin: "http://localhost:1337", "methods": ["GET"] },
      },
      contentTypes: {
        stat: "*",
        team: ["create", "update", "delete"],
      },
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`);
          },
        },
        {
          name: "disconnect",
          handler: ({ strapi }, socket) => {
            strapi.log.info(`[io] new disconnection`);
          },
        },
      ]
    },
  },
  transformer: {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      }
    }
  },
});
