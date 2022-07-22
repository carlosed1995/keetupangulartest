const PROXY_CONFIG = {
    "/api/*": {
        target: 'https://www.mydefaulturl.com',
        router: function (req) {
            var target = 'https://www.myrewrittenurl.com'; // or some custom code
            return target;
        },
        changeOrigin: true,
        secure: false
    }
};

module.exports = PROXY_CONFIG;