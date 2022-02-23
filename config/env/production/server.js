module.exports = ({ env }) => ({
    url: env('MY_HEROKU_URL'),
    cron: {
        enabled: env.bool('CRON_ENABLED', true),
    },
});
