import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }, handleServices) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.authJWT = this.authJWT.bind(this);
    this.handleServices = handleServices;
    this.setJWT = async (req, res, next) => {
      res.locals.data.token = await jwt.generate(res.locals.data.user);
      next();
    };
  }

  signup({ body }, res, next) {
    return this.handleServices(this.service, 'create', body, res, next);
  }

  login({ body }, res, next) {
    return this.handleServices(this.service, 'auth', body, res, next);
  }

  async authJWT({ headers }, res, next) {
    const decoded = await jwt.verify(headers).catch((err) => {
      if (process.env.NODE_ENV === 'development') throw err;
      else next({ status: 401, message: err.message });
    });
    res.locals.user = await this.service.authJWT(decoded).catch(next);
    next();
  }
}
