"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Company, {
        through: models.Users_Companies,
        foreignKey: 'user_id',
        otherKey: 'company_id',
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure the name is not null
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure the email is not null
        unique: true, // Make email unique
        validate: {
          isEmail: true, // Validate that the email follows proper format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // Ensure the password is not null
      },
      google_id: {
        type: DataTypes.STRING,
        unique: true, // Make google_id unique if users can log in via Google
        allowNull: true, // google_id can be null if the user doesn't log in with Google
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
