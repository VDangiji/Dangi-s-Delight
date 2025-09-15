import express from "express";
import {
  getAllOrders,
  updateAnyOrder,
  createOrder,
  getOrders,
  confirmPayment,
  getOrderById,
  updateOrder,
} from "./../controllers/orderController.js";
import authMiddleware from "./../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.get("/getall", getAllOrders);
orderRouter.put("/getall/:id", updateAnyOrder);

//  protect rest of routes using middleware
orderRouter.use(authMiddleware);

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/confirm", confirmPayment);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);

export default orderRouter;
