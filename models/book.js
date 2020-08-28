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
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      colorType: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
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
      thumbnail: {
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
      onDelete: 'CASCADE',
    });
  };

  Book.findAllByDistance = async (latitude, longitude) => {
    const query = `SELECT *,
                6371 * acos (
                  cos ( radians( :latitude ) )
                  * cos( radians( latitude ) )
                  * cos( radians( longitude ) - radians( :longitude ) )
                  + sin ( radians( :latitude ) )
                  * sin( radians( latitude ) )
                ) AS distance
              FROM Book
              GROUP BY id
              HAVING distance >= 0 AND distance < 1000
              ORDER BY distance`;
    const result = await sequelize.query(query, {
      replacements: { latitude, longitude },
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });
    return result;
  };

  return Book;
};
