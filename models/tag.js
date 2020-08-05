export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
      },
    },
    {
      paranoid: false,
      freezeTableName: true,
    }
  );

  Tag.associate = function (models) {
    Tag.hasMany(models.BookTagBridge, {
      foreignKey: 'tagId',
      as: 'books',
    });
  };

  return Tag;
};
