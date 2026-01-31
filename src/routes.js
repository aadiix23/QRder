import express from "express";
import orderRoutes from "./modules/order/order.routes.js";

const router = express.Router();

router.use("/orders", orderRoutes);

export default router;
