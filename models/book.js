export default (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      colorType: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      phrase: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(20),
      },
      description: {
        type: DataTypes.STRING(300),
      },
      pubDate: {
        type: DataTypes.DATE,
      },
      publisher: {
        type: DataTypes.STRING(20),
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      freezeTableName: true,
    }
  );

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user',
    });
    Book.hasMany(models.BookTagBridge, {
      foreignKey: 'bookId',
      as: 'tags',
    });
  };

  return Book;
};
