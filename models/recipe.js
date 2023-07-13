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
      validate: {
        min: 3
      }
  
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 500,
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 1000,
      }
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 5000,
      }
    },
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