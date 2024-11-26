'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Journal.init({
    UserId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    content: DataTypes.TEXT,
    mood: DataTypes.STRING,
    aiInsight: DataTypes.TEXT,
    aiQuestion: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Journal',
  });
  return Journal;
};