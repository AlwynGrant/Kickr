'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Images', [
      {
        userId: 1,
        imageUrl: "https://kickrbucket.s3.us-west-1.amazonaws.com/1631898237683.jpg" ,
        views: 0,
        title: "This is the first one!",
        description: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
