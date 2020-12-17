/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { Types } from 'mongoose';

import models from '../models';
import jwt from '../utils/jwt';

const { ObjectId } = Types;

const user = new models.User({
  fullName: 'test-fullName', username: 'test-username', email: 'test@email.com', password: 'test-password',
});
const token = jwt.generate(user);
const entity = new models.Entity({ title: 'test-title', body: 'test-body', userId: user._id });
const id404 = new ObjectId();
const token401 = jwt.generate({ _id: id404 });

export default {
  seed: { user, entity },
  user: {
    fullName: 'test-fullName', username: 'test-username-1', email: 'test1@email.com', password: 'test-password',
  },
  entity: { title: 'test-title', body: 'test-body' },
  id404,
  token401,
  token,
};
