export const ROUTES = [
    {
        url: '/addUser',
        auth: false,
        proxy: {
            target: "http://localhost:3000/auth/register",
            changeOrigin: true
        }
    },
    {
        url: '/premium',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    }
]

