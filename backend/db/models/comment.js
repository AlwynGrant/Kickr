'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      allowNull: null,
      type: DataTypes.INTEGER
    },
    imageId: {
      allowNull: null,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: null,
      type: DataTypes.TEXT
    }
  }, {});
  Comment.associate = function(models) {
    // associations
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return Comment;
};
