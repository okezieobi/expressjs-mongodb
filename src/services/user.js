import bcrypt from '../utils/bcrypt';

export default class UserServices {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    return this.models.sequelize.transaction(async (t) => {
      let data;
      const userExists = await this.models.user.findByUnique(arg, t);
      if (userExists) data = { message: 'User already exists with either email or username, please sign in', status: 406 };
      else {
        const user = await this.models.user.createOne(arg, t);
        data = { user, status: 201 };
      }
      return data;
    });
  }

  async auth(arg) {
    return this.models.sequelize.transaction(async (t) => {
      let data;
      const userExists = await this.models.user.findByUnique({
        email: arg.user, username: arg.user,
      }, t);
      if (userExists) {
        const verifyPassword = await bcrypt.compareString(userExists.password, arg.password);
        if (verifyPassword) {
          const user = await this.models.user.findByUnique({ email: arg.user, username: arg.user }, t, ['password']);
          data = { user, status: 200 };
        } else data = { message: 'Password provided does not match user', status: 401 };
      } else data = { message: 'User not found, please sign up by creating an account', status: 404 };
      return data;
    });
  }

  async authJWT(arg) {
    return this.models.sequelize.transaction(async (t) => {
      let data;
      const user = await this.models.user.findById(arg, t);
      if (user) data = { user, status: 200 };
      else data = { message: 'User not found, please sign up by creating an account', status: 401 };
      return data;
    });
  }
}
