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
      Type: DataTypes.STRING(255)
    },
    description: {
      allowNull: false,
      Type: DataTypes.TEXT
    }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
