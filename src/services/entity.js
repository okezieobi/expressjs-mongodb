export default class EntityServices {
  constructor({ Entity }, CustomErr) {
    this.model = Entity;
    this.CustomErr = CustomErr;
  }

  async create({ title, body, userId }) {
    const entity = await this.model.create({ title, body, userId });
    return { entity, status: 201 };
  }

  async findByOwner({ userId }) {
    const entities = await this.model.find({ userId }, '_id title body createdAt userId updatedAt', { limit: 10, sort: '-createdAt' }).lean();
    return { entities };
  }

  async findOneByOwner({ userId, _id }) {
    const entity = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id title userId body createdAt updatedAt').lean();
    if (entity === null) throw new this.CustomErr(404, 'Entity not found');
    return { entity };
  }

  async updateOne({
    userId, title, body, _id,
  }) {
    await this.model.updateOne({ $and: [{ userId }, { _id }] }, { title, body });
    const entity = await this.model.findOne({ $and: [{ userId }, { _id }] }, '_id title userId body createdAt updatedAt').lean();
    return { entity };
  }
}
