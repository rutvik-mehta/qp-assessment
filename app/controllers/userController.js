const db = require("../models");

const getAvailableGroceryItems = async (req, res) => {
  try {
    const groceryItems = await db.groceries.findAll({
      where: {
        quantity: { [db.Sequelize.Op.gt]: 0 },
      },
    });

    return res.status(200).json({ data: groceryItems });
  } catch (error) {
    console.error("Error fetching available grocery items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createAnOrder = async (req, res) => {
  try {
    const { userId, groceryItemIds } = req.body;

    const order = await db.orders.create({ userId });

    const groceryItems = await db.groceries.findAll({
      where: { id: groceryItemIds },
    });

    await order.addGroceries(groceryItems);

    return res
      .status(201)
      .json({ message: "Grocery items booked successfully", data: order });
  } catch (error) {
    console.error("Error booking grocery items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAvailableGroceryItems,
  createAnOrder,
};
