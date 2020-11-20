import 'jest-chain';
import 'jest-extended';

import models from '../models';

afterAll(async () => {
  await models.sequelize.close();
});
