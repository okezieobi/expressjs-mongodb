import services from '../services';
import UserController from './user';
import EntityController from './entity';
import jwt from '../utils/jwt';

const handleServiceOutput = (data, { locals }, next) => {
  if (data.message) throw data;
  else {
    const resLocal = locals;
    resLocal.data = data;
    next();
  }
};
const user = new UserController(services, handleServiceOutput, jwt);
const entity = new EntityController(services, handleServiceOutput);

export default {
  user, entity,
};
