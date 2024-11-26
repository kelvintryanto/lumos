"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Journal, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Username not available. Please try again!",
        },
        validate: {
          notNull: { msg: "Username required" },
          notEmpty: { msg: "Username required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email is registered!",
        },
        validate: {
          notNull: { msg: "Email required" },
          notEmpty: { msg: "Email required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password required" },
          notEmpty: { msg: "Password required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          user.password = hash(user.password);
        },
        beforeUpdate: (user) => {
          user.password = hash(user.password);
        },
      },
    }
  );
  return User;
};
