'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: {
      allowNull: null,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: null,
      type: DataTypes.STRING(255)
    }
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};
