/* eslint-disable no-console */
import mongoose, { Schema, model } from 'mongoose';

import userSchema from './user';
import entitySchema from './entity';
import env from '../utils/env';

const models = {
  user: userSchema(Schema, model),
  entity: entitySchema(Schema, model),
};

const databaseSetup = async () => {
  mongoose.connect(env.databaseURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  const db = mongoose.connection;
  await db.once('open', () => console.log('connected to database'));
};

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
  databaseSetup();
} else {
  databaseSetup();
  Object.values(models).forEach(async (modelProp) => { await modelProp.deleteMany(); });
}

export default models;
