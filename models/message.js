'use strict';
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define('message', {
    message: DataTypes.STRING(255), 
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.user);
    message.belongsTo(models.tag);
  };
  return message;
};