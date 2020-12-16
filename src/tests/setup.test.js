import 'jest-chain';
import 'jest-extended';

import models from '../models';
import utils from './utils';

beforeAll(async () => {
  await models.user.insertMany(utils.user.mock2);
});
