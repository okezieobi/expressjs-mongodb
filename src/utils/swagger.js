import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Template REST API', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'REST API for template app', // short description of the app
  },
  servers: [
    { url: '', description: 'Deployed server on Heroku' },
    { url: 'http://localhost:3000/api/v1', description: 'Local development/testing server' },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);
