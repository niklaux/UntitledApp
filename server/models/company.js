"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsToMany(models.User, {
        through: models.Users_Companies,
        foreignKey: 'company_id',
        otherKey: 'user_id',
      });
    }
  }

  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Company",
      timestamps: true, // Enable automatic timestamps
      createdAt: "created_at", // Map Sequelize's createdAt to created_at
      updatedAt: "updated_at", // Map Sequelize's updatedAt to updated_at
    }
  );

  return Company;
};
