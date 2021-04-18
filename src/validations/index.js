import { validationResult, checkSchema } from 'express-validator';

import userSchema from './user';
import entitySchema from './entity';

const handleValidationErr = (status = 400) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ message: errors.array(), status });
};


export default {
  user: {
    signup: [checkSchema({ ...userSchema.validateSignup, ...userSchema.validatePassword}), handleValidationErr()],
    login: [checkSchema({...userSchema.validateLogin, ...userSchema.validatePassword}), handleValidationErr()],
    jwt: [checkSchema({...userSchema.validateJWT}), handleValidationErr(401)],
  },
  entity: {
    create: [checkSchema({...entitySchema.validateInput}), handleValidationErr()],
    id: [checkSchema({ ...entitySchema.validateEntryId}), handleValidationErr()],
  },
};
