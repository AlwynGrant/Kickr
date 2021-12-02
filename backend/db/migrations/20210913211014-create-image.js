'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        hooks: true
      },
      imgUser: {
        allowNull: false,
        type: Sequelize.STRING(30),
        references: { model: 'Users', key: 'username' },
        onDelete: 'CASCADE',
        hooks: true
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: { model: 'Albums' },
        onDelete: 'CASCADE',
        hooks: true
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING(2000)
      },
      views: {
        type: Sequelize.INTEGER
      },
      likes: {
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
