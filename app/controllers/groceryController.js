const db = require("../models");

const createGroceryItem = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }
    if ((quantity && typeof quantity !== "number") || quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const newGroceryItem = await db.groceries.create({
      name,
      category,
      price,
      quantity,
    });

    return res.status(201).json({
      message: "Grocery item created successfully",
      data: newGroceryItem,
    });
  } catch (error) {
    console.error("Error creating grocery item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getGroceryItems = async (req, res) => {
  try {
    const groceryItems = await db.groceries.findAll();

    if (groceryItems.length === 0) {
      return res.status(404).json({ message: "No grocery items found" });
    }

    return res.status(200).json({ data: groceryItems });
  } catch (error) {
    console.error("Error fetching grocery items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeGroceryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const groceryItem = await db.groceries.findByPk(id);

    if (!groceryItem) {
      return res.status(404).json({ message: "Grocery item not found" });
    }

    await groceryItem.destroy();

    return res
      .status(200)
      .json({ message: "Grocery item removed successfully" });
  } catch (error) {
    console.error("Error removing grocery item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateGroceryItem = async (req, res) => {
  try {
    const { id } = req.params;

    let groceryItem = await db.groceries.findByPk(id);

    if (!groceryItem) {
      return res.status(404).json({ message: "Grocery item not found" });
    }

    groceryItem = await groceryItem.update(req.body);

    return res
      .status(200)
      .json({ message: "Grocery item updated successfully", groceryItem });
  } catch (error) {
    console.error("Error updating grocery item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const manageInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityChange } = req.body;

    let groceryItem = await db.groceries.findByPk(id);

    if (!groceryItem) {
      return res.status(404).json({ message: "Grocery item not found" });
    }

    groceryItem.quantity += quantityChange;

    await groceryItem.save();

    return res.status(200).json({
      message: "Inventory quantity updated successfully",
      groceryItem,
    });
  } catch (error) {
    console.error("Error managing inventory:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createGroceryItem,
  getGroceryItems,
  removeGroceryItem,
  updateGroceryItem,
  manageInventory,
};
