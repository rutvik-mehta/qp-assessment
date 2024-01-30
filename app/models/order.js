module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Order", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    groceryItemIds: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: [],
    },
  });
  return Order;
};
