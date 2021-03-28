import jwt from 'jsonwebtoken';

import env from './env';

export default class JWT {
  static generate({ _id }) {
    return jwt.sign({
      _id,
    }, env.jwtSecret, {
      expiresIn: '1h',
    });
  }

  static async verify({ token }) {
    return jwt.verify(token, env.jwtSecret);
  }
}
