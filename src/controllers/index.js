import services from '../services';
import UserController from './user';
import EntityController from './entity';

const handleServices = async (service, method, input, res, next) => {
  res.locals.data = await service[method](input).catch(next);
  next();
};

const user = new UserController(services, handleServices);
const entity = new EntityController(services, handleServices);

export default {
  user, entity,
};
