import { Express } from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware'
import { Auth_Middleware } from '../middleware/Auth_Middleware';
import { NextFunction } from 'http-proxy-middleware/dist/types';
import logger from '../logger/WinstonLogger';

const setupProxies = (app: Express, routes: any) => {
    routes.forEach((r: any) => {
        if (r.auth) {
            app.use(r.url, Auth_Middleware , createProxyMiddleware(r.proxy));
        } else {
            app.use(r.url , createProxyMiddleware(r.proxy));
        }
        
    })
}

export { setupProxies }