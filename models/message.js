'use strict';
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define('message', {
    message: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};