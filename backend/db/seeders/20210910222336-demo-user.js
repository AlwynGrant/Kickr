'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demo.com',
        username: 'demodude',
        profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
        profileBannerImg: "https://kickrbucket.s3.us-west-1.amazonaws.com/1632150248245.jpg",
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
        profileBannerImg: "https://kickrbucket.s3.us-west-1.amazonaws.com/1637274867709.jpg",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
        profileBannerImg: "https://kickrbucket.s3.us-west-1.amazonaws.com/kickr-splash.PNG",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
