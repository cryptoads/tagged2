'use strict';
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define('message', {
    message: DataTypes.STRING, 
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.user);
    message.belongsTo(models.tag);
  };
  return message;
};