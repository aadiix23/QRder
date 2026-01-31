import { Order } from "./order.model.js";

export const createOrderService = async (payload) => {
    const { items } = payload;

    const totalAmount = items.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
    );
    return await Order.create({
        ...payload, totalAmount
    })
};

export const addItemToOrderService = async (
    orderId,
    newItems
) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order Not Found");
    }
    if (["READY", "SERVED", "CLOSED", "CANCELLED"].includes(order.status)) {
        throw new Error("Cannot modify order in current state");
    }
    newItems.forEach((newItem) => {
        const existingItem = order.items.find(
            (item) => item.menuItemId.toString() === newItem.menuItemId
        );
        if (existingItem) {
            existingItem.qty += newItem.qty;
        }
        else { order.items.push(newItem) }
    });
    order.totalAmount = order.items.reduce(
        (sum, item) => sum + item.qty * item.price, 0
    );
    return await order.save();
};
export const updateOrderStatusService = async (
    orderId,
    status
) => {
    const allowedTransitions = {
        NEW: ["PREPARING", "CANCELLED"],
        PREPARING: ["READY"],
        READY: ["SERVED"],
        SERVED: ["CLOSED"]
    };
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not Found");
    }
    const allowed = allowedTransitions[order.status] || [];
    if (!allowed.includes(status)) {
        throw new Error(
            `Invalid status transition from ${order.status} to ${status}`
        );
    }
    order.status = status;
    return await order.save();
};