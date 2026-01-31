import express from "express";
import { createOrder, addItemToOrder, updateOrderStatus } from "./order.controller.js"

const router = express.Router();
router.post("/", createOrder);
router.patch("/:id/add-item", addItemToOrder);
router.patch("/:id/status", updateOrderStatus);

export default router;