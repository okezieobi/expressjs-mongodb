export default class UserMiddleWare {
  constructor(validations, controllers) {
    this.signup = [...validations.user.signup, controllers.user.signup];
    this.login = [...validations.user.login, controllers.user.login];
    this.jwt = [...validations.user.jwt, controllers.user.findById];
  }
}
