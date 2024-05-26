module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    return Book;
  };