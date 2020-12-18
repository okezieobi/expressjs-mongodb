import 'jest-chain';
import 'jest-extended';

import utils from './utils';

beforeAll(async () => {
  await utils.seed.userDoc.save();
  await utils.seed.entityDoc.save();
});

afterAll(async () => {
  await utils.models.db.close();
});
