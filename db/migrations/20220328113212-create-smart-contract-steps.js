"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("smart_contract_steps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      smart_contract_id: {
        type: Sequelize.INTEGER,
      },
      step_type: {
        type: Sequelize.STRING,
      },
      step_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("smart_contract_steps");
  },
};
