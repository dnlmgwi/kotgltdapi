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
  graphql: {
    endpoint: '/graphql',
    shadowCRUD: true,
    playgroundAlways: true,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env('SMTP_PORT'),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: 'hello@kotg.club',
        defaultReplyTo: 'hello@kotg.club',
      },
    },
  },
  publisher: {
    enabled: true,
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
  io: {
    enabled: true,
    config: {
      IOServerOptions: {
        cors: { origin: "http://localhost:1337", "methods": ["GET"] },
      },
      contentTypes: {
        stat: "*",
        team: "*",
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
});
