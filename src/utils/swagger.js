import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const servers = process.env.NODE_ENV === 'production'
  ? [
    { url: '', description: 'Deployed server on Heroku' },
  ] : [
    { url: 'http://localhost:5000/api/v1', description: 'Local development/testing server' },
  ];

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Template REST API', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'REST API for template app', // short description of the app
  },
  servers,
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'header',
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
export default {
  setup: swaggerUI.setup(swaggerJSDoc(options)),
  serve: swaggerUI.serve,
};
