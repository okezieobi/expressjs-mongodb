/* eslint-disable no-underscore-dangle */
export default class EntityController {
  constructor({ entity }, handleServices) {
    this.service = entity;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.handleServices = handleServices;
  }

  createOne({ body: { title, body } }, res, next) {
    return this.handleServices(this.service, 'create', { title, body, userId: res.locals.user._id }, res, next);
  }

  findAll(req, res, next) {
    return this.handleServices(this.service, 'findByOwner', { userId: res.locals.user._id }, res, next);
  }

  findOneById({ params: { id } }, res, next) {
    return this.handleServices(this.service, 'findOneByOwner', { userId: res.locals.user._id, _id: id }, res, next);
  }

  updateOne({ body: { title, body } }, res, next) {
    const input = {
      title: title || res.locals.data.entity.title,
      body: body || res.locals.data.entity.body,
      userId: res.locals.user._id,
      _id: res.locals.data.entity._id,
    };
    return this.handleServices(this.service, 'updateOne', input, res, next);
  }
}
