"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // Define association with the User model
      Feedback.belongsTo(models.User, {
        foreignKey: "user_id", // Foreign key linking to the User model
        as: "user", // Alias for accessing user details
        onDelete: "CASCADE", // Delete feedback when the user is deleted
      });
    }
  }

  Feedback.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, // Content is required
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true, // Position is optional
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true, // Company is optional
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure feedback is linked to a user
        references: {
          model: "Users", // References the User model
          key: "id",
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true, // The image_url is optional
      },
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );

  return Feedback;
};
