'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    tagnum: DataTypes.STRING,
    vin: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  tag.associate = function(models) {
    tag.hasMany(models.message);
      tag.belongsToMany(models.user, 
                {
                    through: 'usertags'
                })
  };
  return tag;
};