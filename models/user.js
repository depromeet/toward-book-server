export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nickname: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      profileImageType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      socialLoginType: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      socialLoginId: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      paranoid: false,
      freezeTableName: true,
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Book, {
      foreignKey: 'userId',
      as: 'books',
    });
  };

  return User;
};
