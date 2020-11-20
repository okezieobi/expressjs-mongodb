import { Model, Op } from 'sequelize';

export default class Entity extends Model {
  static async createOne({ title, body, id }, transaction) {
    return this.create({
      title,
      body,
      UserId: id,
    }, {
      transaction,
    });
  }

  static async updateOne({
    title, body, UserId, id,
  }, transaction) {
    await this.update({ title, body }, {
      where: {
        [Op.and]: [
          { UserId }, { id },
        ],
      },
      transaction,
    });
    return this.findOneByOwnerId({ UserId, id }, transaction);
  }

  static async findAllByOwnerId(id, transaction) {
    return this.findAll({
      where: {
        UserId: id,
      },
      transaction,
    });
  }

  static async findOneByOwnerId({ UserId, id }, transaction) {
    return this.findOne({
      where: {
        [Op.and]: [
          { UserId }, { id },
        ],
      },
      transaction,
    });
  }

  static associate({ user }) {
    this.belongsToUser = this.belongsTo(user, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static schema(DataTypes) {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(256),
        allowNull: false,
        notEmpty: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },
    };
  }

  static init(sequelize, DataTypes) {
    return super.init({
      ...this.schema(DataTypes),
    },
    {
      sequelize,
      modelName: 'Entity',
    });
  }
}
