'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructions: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'recipe',
    tableName: 'recipes',
    underscored: true
  });
  return recipe;
};