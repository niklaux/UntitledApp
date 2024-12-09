module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Companies', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Default to the current timestamp
    });
    await queryInterface.changeColumn('Companies', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // Default to the current timestamp
    });
  },

  down: async (queryInterface) => {
    await queryInterface.changeColumn('Companies', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('Companies', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
