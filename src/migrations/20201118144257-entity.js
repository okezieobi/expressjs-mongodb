import models from '../models';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('Entities', {
        ...models.entity.schema(Sequelize),
        ...models.modelTimestamps(Sequelize),
        UserId: {
          type: Sequelize.UUID,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'id',
          },
          allowNull: false,
        },
      }, { transaction: t });
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('Entities', { transaction: t });
    });
  },
};
