export default class UserController {
  constructor({ user }, jwt) {
    this.services = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
    this.setJWT = this.setJWT.bind(this);
    this.verifyJWT = this.verifyJWT.bind(this);
    this.jwt = jwt;
  }

  signup({ body }, res, next) {
    this.services.create(body)
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  login({ body }, res, next) {
    this.services.auth({ user: body.user, password: body.password })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  findById(req, res, next) {
    this.services.authJWT(res.locals.userId).then((data) => {
      if (data.message) throw data;
      else next();
    }).catch(next);
  }

  setJWT(req, res, next) {
    const token = this.jwt.generate(res.locals.data.user);
    res.cookie('token', token, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true });
    next();
  }

  verifyJWT({ cookies }, res, next) {
    this.jwt.verify(cookies)
      .then(({ _id }) => {
        res.locals.userId = _id;
        next();
      }).catch(next);
  }
}
