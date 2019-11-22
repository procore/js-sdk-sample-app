import { Router } from 'express';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();
export const authProxyRouter = Router();

authProxyRouter.use((req, res) => {
  proxy.web(req, res, {
    changeOrigin: true,
    target: process.env.PROCORE_SERVER,
  });
});
