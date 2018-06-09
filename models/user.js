'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    state: DataTypes.STRING,
    membership: DataTypes.INTEGER

  }, {});
  user.associate = function(models) {
   user.hasMany(models.message);
   user.belongsToMany(models.tag, {
    through: 'usertags'
   })
  };
  return user;
};