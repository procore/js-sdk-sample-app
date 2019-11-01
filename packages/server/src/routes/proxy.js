import { Router } from 'express';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();
export const proxyRouter = Router();

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Authorization', `Bearer ${req.session.accessToken}`);
});

proxyRouter.use((req, res) => {
  proxy.web(req, res, {
    changeOrigin: true,
    target: process.env.PROCORE_SERVER,
  });
});
