import bcrypt from '../utils/bcrypt';

export default class UserServices {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    const userExists = await this.models.user.findByUnique(arg);
    let data;
    if (userExists) data = { message: 'User already exists with either email or username, please sign in', status: 406 };
    else {
      const user = await this.models.user.create(arg);
      data = { user, status: 201 };
    }
    return data;
  }

  async auth(arg) {
    const user = await this.models.user.findByUnique({
      email: arg.user, username: arg.user,
    });
    let data;
    if (user) {
      const verifyPassword = await bcrypt.compareString(user.password, arg.password);
      if (verifyPassword) {
        data = { user, status: 200 };
      } else data = { message: 'Password provided does not match user', status: 401 };
    } else data = { message: 'User not found, please sign up by creating an account', status: 404 };
    return data;
  }

  async authJWT(arg) {
    const user = await this.models.user.findById(arg);
    let data;
    if (user) data = { user, status: 200 };
    else data = { message: 'User not found, please sign up by creating an account', status: 401 };
    return data;
  }
}
