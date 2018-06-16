'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
     username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[a-z0-9\_\-]+$/i,
          }
     },
    email: {
        type: DataTypes.STRING,
         validate: {
         isEmail: true
        }
     },
    githubid: DataTypes.STRING,
    state: DataTypes.STRING(2),
    password:DataTypes.STRING,
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