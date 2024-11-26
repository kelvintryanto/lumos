"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const journals = require("../data/journal.json");
    journals.forEach((journal) => {
      delete journal.id;
      journal.UserId = journal.user_id;
      delete journal.user_id;
      journal.createdAt = journal.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Journals", journals, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Journals", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
