"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MonthlySummaries", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      month: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total_customers: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      total_members: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      active_now: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MonthlySummaries");
  },
};
