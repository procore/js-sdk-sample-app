import { Router } from 'express';

export const sessionRouter = Router();

sessionRouter.get('/logout', function logoutSession(req, res) {
  req.session = null;
  res.redirect('/oauth/procore/');
});
