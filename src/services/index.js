import models from '../models';
import UserServices from './user';
import EntityServices from './entity';
import error from './error';

const user = new UserServices(models, error);
const entity = new EntityServices(models, error);

export default {
  user, entity,
};
