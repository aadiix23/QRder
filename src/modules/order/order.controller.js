import { createOrderService, addItemToOrderService, updateOrderStatusService } from "./order.service.js";
export const createOrder = async (req, res) => {
    try {
        const order = await createOrderService(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const addItemToOrder = async (req, res) => {
    try {
        const order = await addItemToOrderService(
            req.params.id,
            req.body.items
        );
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await updateOrderStatusService(
            req.params.id,
            req.body.status
        );
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
