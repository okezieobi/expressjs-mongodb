import { config } from 'dotenv';

config();

const databaseURL = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL;

export default {
  databaseURL,
  jwtSecret: process.env.JWT_SECRET,
};
