import 'jest-chain';
import 'jest-extended';

import models from '../models';
import utils from './utils';

beforeAll(async () => {
  await models.Entity.deleteMany();
  await models.User.deleteMany();
  await utils.seed.user.save();
  await utils.seed.entity.save();
});

afterAll(async () => {
  await models.db.close();
});
