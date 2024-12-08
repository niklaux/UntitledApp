"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users_Companies extends Model {
    static associate(models) {
      // Define relationships if needed for advanced queries
    }
  }

  Users_Companies.init(
    {
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      licenses_used: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Default to 0
      },
      active_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Default to active
      },
    },
    {
      sequelize,
      modelName: "Users_Companies",
      timestamps: false, // No created_at or updated_at needed
    }
  );

  return Users_Companies;
};
