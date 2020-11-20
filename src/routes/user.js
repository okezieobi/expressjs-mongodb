export default (Router, { handleResponse, middleware }) => {
  const router = Router();

  router.post('/signup', middleware.user.signup, handleResponse);

  router.post('/login', middleware.user.login, handleResponse);

  return router;
};
