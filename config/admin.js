module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3be8a04d7f2f3ab77a69020c688d3776'),
  },
});
