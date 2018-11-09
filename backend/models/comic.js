'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comic = sequelize.define('Comic', {
    title: DataTypes.STRING,
    post: DataTypes.TEXT,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    titleText: DataTypes.TEXT,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN,
    script: DataTypes.TEXT,
    tags: DataTypes.STRING
  }, {});
  Comic.associate = function(models) {
    // associations can be defined here
  };
  return Comic;
};
