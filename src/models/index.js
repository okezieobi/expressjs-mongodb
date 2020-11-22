/* eslint-disable no-console */
import mongoose, { Schema, model } from 'mongoose';

import userSchema from './user';
import env from '../utils/env';

(async () => {
  mongoose.connect(env.databaseURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  const db = mongoose.connection;
  await db.once('open', () => console.log('connected to database'));
})();

export default {
  user: model('User', userSchema(Schema)),
};
