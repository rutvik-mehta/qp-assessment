module.exports = (sequelize, Sequelize) => {
  const Grocery = sequelize.define("Grocery", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Grocery;
};
