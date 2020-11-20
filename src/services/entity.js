export default class EntityServices {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const entity = await this.models.entity.createOne(arg, t);
      return { entity, status: 201 };
    });
  }

  async findByOwner(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const entities = await this.models.entity.findAllByOwnerId(arg, t);
      return { entities, status: 200 };
    });
  }

  async findOneByOwner(arg) {
    return this.models.sequelize.transaction(async (t) => {
      let data;
      const entity = await this.models.entity.findOneByOwnerId(arg, t);
      if (entity) data = { entity, status: 200 };
      else data = { message: 'Entity not found', status: 404 };
      return data;
    });
  }

  async updateOne(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const entity = await this.models.entity.updateOne(arg, t);
      return { entity, status: 200 };
    });
  }
}
