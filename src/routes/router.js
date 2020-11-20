import { Router } from 'express';

import userRoutes from './user';
import entryRoutes from './entity';
import middleware from '../middleware';
import jwt from '../utils/jwt';

const router = Router();

const handleResponse = (req, res) => {
  if (res.locals.data.user) {
    res.locals.data.token = jwt.generate(res.locals.data.user);
    res.status(res.locals.data.status).set('token', res.locals.data.token).send({ data: res.locals.data });
  } else {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  }
};

router.use('/auth', userRoutes(Router, { handleResponse, middleware }));
router.use(middleware.user.jwt);
router.use('/entities', entryRoutes(Router, { handleResponse, middleware }));

export default router;
