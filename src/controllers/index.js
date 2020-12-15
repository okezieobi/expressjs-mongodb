import services from '../services';
import UserController from './user';
import EntityController from './entity';
import jwt from '../utils/jwt';

const user = new UserController(services, jwt);
const entity = new EntityController(services);

export default {
  user, entity,
};
