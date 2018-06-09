'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING
  }, {});
  user.associate = function(models) {
   user.hasMany(models.message);
  };
  return user;
};