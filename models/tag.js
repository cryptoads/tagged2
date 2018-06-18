'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    tagnum: DataTypes.STRING(8),
    vin: DataTypes.STRING,
    state: DataTypes.STRING(2),
    make: DataTypes.STRING, 
    model: DataTypes.STRING, 
    year: DataTypes.INTEGER(4)
  }, {});
  tag.associate = function(models) {
    tag.hasMany(models.message);
      tag.belongsToMany(models.user, 
                {
                    through: 'usertags'
                }, {hooks: false})
  };
  return tag;
};