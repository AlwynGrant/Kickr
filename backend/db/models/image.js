'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: DataTypes.INTEGER,
    imgUser: DataTypes.STRING(30),
    albumId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    views: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    title: DataTypes.STRING(100),
    description: DataTypes.STRING(1000)
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.belongsTo(models.User, { foreignKey: 'imgUser' });
    Image.hasMany(models.Comment, { foreignKey: 'imageId', onDelete: 'CASCADE', hooks: true });
    Image.hasMany(models.Like, { foreignKey: 'imageId', onDelete: 'CASCADE', hooks: true });
  };
  return Image;
};
