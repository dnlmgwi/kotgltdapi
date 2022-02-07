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
    endpoint: '/v1/graphql',
    shadowCRUD: true,
    playgroundAlways: true,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: false,
    },
  },
  // email: {
  //   config: {
  //     provider: 'nodemailer',
  //     providerOptions: {
  //       host: env('SMTP_HOST'),
  //       port: env('SMTP_PORT'),
  //       auth: {
  //         user: env('SMTP_USERNAME'),
  //         pass: env('SMTP_PASSWORD'),
  //       },
  //     },
  //     settings: {
  //       defaultFrom: 'hello@kotg.club',
  //       defaultReplyTo: 'hello@kotg.club',
  //     },
  //   },
  // },
});
