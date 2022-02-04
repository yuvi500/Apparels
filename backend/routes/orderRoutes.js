import express from "express";
import { addOrderItems,getOrderById, updateOrderToPaid, getMyOrders,getOrders,updateOrderToDelivered,updateCountInStock } from "../controllers/orderController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router=express.Router()

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById).put(protect,updateCountInStock)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)


export default router