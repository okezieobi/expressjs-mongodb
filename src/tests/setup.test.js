import 'jest-chain';
import 'jest-extended';

import models from '../models';
import utils from './utils';

beforeAll(async () => {
  await models.Entity.deleteMany();
  await models.User.deleteMany();
  await utils.seed.userDoc.save();
  await utils.seed.entityDoc.save();
});

afterAll(async () => {
  await models.db.close();
});
