'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};