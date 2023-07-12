'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('recipes', [{
      title: "Mac & Cheese",
      description: "description goes here",
      ingredients: "Mac, cheese, and milk",
      instructions: "instructions goes here",
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      title: "Pizza",
      description: "description goes here",
      ingredients: "Wheat, cheese, tomato",
      instructions: "instructions goes here",
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  

    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('recipes', null, {});
    }
},};
