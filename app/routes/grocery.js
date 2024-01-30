const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.post(
  "/grocery",
  authMiddleware,
  isAdmin,
  groceryController.createGroceryItem
);
router.post("/order", userController.createAnOrder);
router.get(
  "/grocery",
  authMiddleware,
  isAdmin,
  groceryController.getGroceryItems
);
router.put(
  "/grocery/:id",
  authMiddleware,
  isAdmin,
  groceryController.updateGroceryItem
);
router.put(
  "/grocery/:id/manageInventory",
  authMiddleware,
  isAdmin,
  groceryController.manageInventory
);
router.delete(
  "/grocery/:id",
  authMiddleware,
  isAdmin,
  groceryController.removeGroceryItem
);

router.get("/grocery/items", userController.getAvailableGroceryItems);

module.exports = router;
