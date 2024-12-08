"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // Many-to-Many relationship with Users through Users_Companies
      Company.belongsToMany(models.User, {
        through: models.Users_Companies,
        foreignKey: "company_id",
        as: "users", // Alias for accessing associated users
      });
    }
  }

  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Company name is required
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional field
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
      },
    },
    {
      sequelize,
      modelName: "Company",
      timestamps: true, // Includes created_at and updated_at
    }
  );

  return Company;
};
