import express from 'express';
import { configDotenv } from 'dotenv'
import { setupLogging } from './logger/LoggerMiddleware';
import { setupProxies } from './proxy/setupProxy';
import { ROUTES } from './router/Routes';
import logger from './logger/WinstonLogger';
import { createProxyMiddleware } from 'http-proxy-middleware';

configDotenv()


const PORT = process.env.PORT || 5000;
const app = express();

setupLogging(app)
setupProxies(app, ROUTES)


app.use((req, res) => {
    res.status(404).json({ error: 'Route not found in gateway' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});