import { md5Hash } from './utils/crypto';

if (process.env.BROWSER) {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}

export default {
    // Node.js app
    port: process.env.PORT || 3000,

    // Dev server port
    devPort: process.env.DEV_PORT || 3002,

    // https://expressjs.com/en/guide/behind-proxies.html
    trustProxy: process.env.TRUST_PROXY || 'loopback',

    // API Gateway
    api: {
        // API URL to be used in the client-side code
        clientUrl: process.env.API_CLIENT_URL || '',
        // API URL to be used in the server-side code
        serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
    },

    // Database
    databaseUrl:
        process.env.DATABASE_URL || process.env.CLEARDB_DATABASE_URL || 'mysql://root:root@localhost:3306/playtime',

    // Redis
    redisUrl: process.env.REDIS_URL || 'localhost',

    // Web analytics
    analytics: {
        // https://analytics.google.com/
        googleTrackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X', // UA-XXXXX-X
    },

    // Authentication
    auth: {
        tokenKey: process.env.TOKEN_KEY || 'idToken',

        jwt: { secret: process.env.JWT_SECRET || 'idontknow' },

        vk: {
            appId: process.env.VK_APP_ID || '',
            appSecret: process.env.VK_APP_SECRET || '',
            appAccessToken: process.env.VK_APP_TOKEN || '',
            userAccessToken: process.env.VK_USER_TOKEN || '',
            groupId: process.env.VK_GROUP_ID || '',
            groupAccessToken: process.env.VK_GROUP_TOKEN || '',
        },

        fk: {
            merchantId: process.env.FK_MERCHANT_ID || '',
            secret: process.env.FK_SECRET || '',
            secret2: process.env.FK_SECRET2 || '',
            walletId: process.env.FK_WALLET_ID || '',
            apiKey: process.env.FK_API_KEY || '',
        },

        qiwi: {
            proxy: {
                protocol: process.env.QIWI_PROXY_PROTOCOL || '',
                hostname: process.env.QIWI_PROXY_HOST || '',
                port: process.env.QIWI_PROXY_PORT || '',
                userId: process.env.QIWI_PROXY_USER || '',
                password: process.env.QIWI_PROXY_PASSWORD || '',
            },
            personId: process.env.QIWI_PERSON_ID || '',
            personToken: process.env.QIWI_PERSON_TOKEN || '',
            p2pSecret: process.env.QIWI_P2P_SECRET || '',
            mediatorLink: (url: string): string => {
                const baseUrl = 'https://example.com/to.php';
                const sign = md5Hash(`SuPeR SeCrEt PhRaSe${url}`);

                return `${baseUrl}?t=${encodeURIComponent(url)}&s=${sign}`;
            },
        },
    },

    // App config
    app: {
        lastBidDelay: 3000,
        onlineDelay: 10000,
        additionalOnlineK: 0.1,
    },
};
