export default (sequelize, DataTypes) => {
  const BookTagBridge = sequelize.define(
    'BookTagBridge',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      freezeTableName: true,
    }
  );

  BookTagBridge.associate = (models) => {
    BookTagBridge.belongsTo(models.Book, {
      foreignKey: 'bookId',
      targetKey: 'id',
      as: 'book',
    });
    BookTagBridge.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      targetKey: 'id',
      as: 'tag',
    });
  };

  return BookTagBridge;
};
