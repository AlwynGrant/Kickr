'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Albums', [
        { userId: 1, title: 'This is a test album!', createdAt: new Date(), updatedAt: new Date() },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
