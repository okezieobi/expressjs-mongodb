import { validationResult, checkSchema } from 'express-validator';

import UserSchema from './user';
import EntitySchema from './entity';
import jwt from '../utils/jwt';

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status: 400 });
};

const decodeJwt = async ({ headers }, res, next) => {
  await jwt.verify(headers)
    .then(({ id }) => {
      res.locals.userId = id;
      next();
    }).catch(next);
};

const userSchema = new UserSchema(checkSchema);
const entitySchema = new EntitySchema(checkSchema);

export default {
  user: {
    signup: [userSchema.validateSignup, handleValidationErr],
    login: [userSchema.validateLogin, handleValidationErr],
    jwt: [userSchema.validateJWT, handleValidationErr, decodeJwt],
  },
  entity: {
    create: [entitySchema.validateInput, handleValidationErr],
    id: [entitySchema.validateEntryId, handleValidationErr],
  },
};
