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
    // associations
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.belongsTo(models.Album, { foreignKey: 'albumId' });
    Image.hasMany(models.Comment, { foreignKey: 'imageId', onDelete: 'CASCADE', hooks: true });
  };
  return Image;
};
