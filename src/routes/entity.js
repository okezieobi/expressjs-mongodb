export default (Router, { handleResponse, middleware }) => {
  const router = Router();

  router.route('/')
    .post(middleware.entity.createOne, handleResponse)
    .get(middleware.entity.getAll, handleResponse);

  router.use('/:id', middleware.entity.verifyOne);
  router.route('/:id')
    .put(middleware.entity.updateOne, handleResponse)
    .get(handleResponse);

  return router;
};
