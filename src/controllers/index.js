import services from '../services';
import UserController from './user';
import EntityController from './entity';

const user = new UserController(services);
const entity = new EntityController(services);

export default {
  user, entity,
};
