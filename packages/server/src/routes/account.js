import { Router } from 'express';
import { revoke } from '@procore/js-sdk';

export const accountRouter = Router();

accountRouter.get('/revoke', async (req, res) => {
  const revokeRes = await revoke({
    token: req.session.accessToken,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  res.json(revokeRes);
});
