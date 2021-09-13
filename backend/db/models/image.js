'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      allowNull: false,
      Type: DataTypes.INTEGER
    },
    albumId: {
      allowNull: false,
      Type: DataTypes.INTEGER
    },
    imageUrl: {
      allowNull: false,
      Type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      Type: DataTypes.STRING
    }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
