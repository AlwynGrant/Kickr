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
    // associations
    Album.belongsTo(models.User, { foreignKey: 'userId' });
    Album.hasMany(models.Image, { foreignKey: 'albumId' });
  };
  return Album;
};
