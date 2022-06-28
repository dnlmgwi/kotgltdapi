module.exports = {
    routes: [
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/v1/mpamba/callback',
            handler: 'payment-management.callback',
        },
        { // Path defined with a URL parameter
            method: 'POST',
            path: '/v1/mpamba/pay',
            handler: 'payment-management.pay',
            config: {
                policies: ['global::isAuthenticated']
            }

        }]
}
