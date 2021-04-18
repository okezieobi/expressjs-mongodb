export default {
    validateLogin: {
      user: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email or username should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Email or username must be string data type',
        },
        exists: {
          errorMessage: 'Email or username is required',
          options: { checkFalsy: true },
        },
      },
    },

    validateSignup: {
      username: {
        in: ['body'],
        isLength: {
          errorMessage: 'Username should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Username must be string data type',
        },
        exists: {
          errorMessage: 'Username is required',
          options: { checkFalsy: true },
        },
      },
      fullName: {
        in: ['body'],
        isLength: {
          errorMessage: 'Full name should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Full name must be string data type',
        },
        exists: {
          errorMessage: 'Full name is required',
          options: { checkFalsy: true },
        },
      },
      email: {
        in: ['body'],
        isEmail: {
          errorMessage: 'Email format is wrong',
        },
        isString: {
          errorMessage: 'Email must be string data type',
        },
        exists: {
          errorMessage: 'Email is required',
          options: { checkFalsy: true },
        },
      },
    },

    validatePassword: {
      password: {
        in: ['body'],
        isLength: {
          errorMessage: 'Password should be at least a character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Password must be string data type',
        },
        exists: {
          errorMessage: 'Password is required',
          options: { checkFalsy: true },
        },
      },
    },

    validateJWT: {
      token: {
        in: ['headers'],
        isString: {
          errorMessage: 'Token must be string data type',
        },
        exists: {
          errorMessage: 'Token is required',
          options: { checkFalsy: true },
        },
        isJWT: {
          errorMessage: 'Token does not match Json Web Token format',
        },
      },
    },
}
