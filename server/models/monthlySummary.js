"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MonthlySummary extends Model {
    static associate(models) {
      // Define relationships if needed for advanced queries
    }
  }

  MonthlySummary.init(
    {
      month: {
        type: DataTypes.DATE,
        allowNull: false, // Month is required
      },
      total_customers: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Default to 0
      },
      total_members: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Default to 0
      },
      active_now: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Default to 0
      },
    },
    {
      sequelize,
      modelName: "MonthlySummary",
      timestamps: true, // Includes created_at and updated_at
    }
  );

  return MonthlySummary;
};