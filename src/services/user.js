export default class UserServices {
  constructor({ User }, CustomErr) {
    this.model = User;
    this.CustomErr = CustomErr;
  }

  async create(arg) {
    const userExists = await this.model
      .exists({ $or: [{ username: arg.username }, { email: arg.email }] });
    if (userExists) throw new this.CustomErr(406, `Account already exists with either email ${arg.email} or username ${arg.username}, please sign in or sign up with a different email or username`);
    await this.model.create(arg);
    const user = await this.model
      .findOne({ $and: [{ username: arg.username }, { email: arg.email }] },
        '_id, fullName email username type createdAt').lean();
    return { user, status: 201 };
  }

  async auth(arg) {
    const userExists = await this.model
      .findOne({ $or: [{ username: arg.user }, { email: arg.user }] }, 'password').lean();
    if (userExists) {
      const verifyPassword = await this.model.comparePassword(userExists.password, arg.password);
      if (!verifyPassword) throw new this.CustomErr(401, 'Password provided does not match user');
    } else throw new this.CustomErr(404, `Account with ${arg.user} does not exist, please sign up by creating an account`);
    const user = await this.model
      .findOne({ $or: [{ username: arg.user }, { email: arg.user }] },
        '_id, fullName email username type createdAt updatedAt').lean();
    return { user };
  }

  async authJWT(arg) {
    const user = await this.model.findById(arg, '_id, fullName email username type createdAt updatedAt').lean();
    if (user === null) throw new this.CustomErr(401, 'User not found, please sign up by creating an account');
    return user;
  }
}
