"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Journal.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aiTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aiInsight: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      aiQuestion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Journal",
      indexes: [
        {
          unique: false,
          fields: ["UserId"],
        },
        {
          unique: false,
          fields: ["mood"],
        },
      ],
    }
  );
  return Journal;
};
