import Order from "../models/orderModel.js";
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc Create new order
//@route POST /api/orders
//@access Private Route
const addOrderItems=asyncHandler(async(req,res)=>{
  const{orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body

  if(orderItems && orderItems.length===0){
    res.status(400)
    throw new Error("No order Items")
    return
  }else{
    const order=new Order({
      user:req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder=await order.save()

    res.status(201).json(createdOrder)
  }
})

//@desc Get order by id
//@route GET /api/orders/:id
//@access Private Route
const getOrderById=asyncHandler(async(req,res)=>{
  const order=await Order.findById(req.params.id).populate('user', 'name email')

  if(order){
    res.json(order)
  }else{
    res.status(404)
    throw new Error("Order not found")
  }
})


//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private Route
const updateOrderToPaid=asyncHandler(async(req,res)=>{
  const order=await Order.findById(req.params.id)

  if(order){
    order.isPaid=true
    order.paidAt=Date.now()
    order.paymentResult={
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.payer.email_address
    }

    const updatedOrder=await order.save()

    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error("Order not found")
  }

})

//@desc Get logged in user's order
//@route POST /api/orders/myorders
//@access Private Route
const getMyOrders=asyncHandler(async(req,res)=>{
  const orders=await Order.find({user:req.user._id})
  res.json(orders)

})

//@desc Get all orders
//@route POST /api/orders
//@access Private Admin
const getOrders=asyncHandler(async(req,res)=>{
  const orders=await Order.find({}).populate('user','id name')
  res.json(orders)

})

//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private Admin
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
  const order=await Order.findById(req.params.id)

  if(order){
    order.isDelivered=true
    order.deliveredAt=Date.now()
    
    const updatedOrder=await order.save()

    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error("Order not found")
  }
})




//@desc Update count in stock
//@route PUT /api/orders/:id
//@access Private Admin
const updateCountInStock=asyncHandler(async(req,res)=>{
  // console.log(req.params.id)
  // const id=mongoose.Types.ObjectId(req.params.id);
  // console.log(id)
  // if (id.match(/^[0-9a-fA-F]{24}$/))
  const id=req.params.id
  console.log("In controller")
  console.log(id)
  const order=await Order.findById(id)
  const orderedProducts=order.orderItems
  let productIds=[];
  let qtys=[]
  orderedProducts.forEach(function (item) {
    productIds.push(item.product)
    qtys.push(item.qty)
});

  for(let i=0;i<qtys.length;i++){
    let product=await Product.findById(productIds[i])
    let qty=qtys[i]

    if(product){
    const newStockQty=product.countInStock-qty;
    product.countInStock=newStockQty;
    const updatedProduct=await product.save()

    res.json(updatedProduct)
  }else{
    res.status(404)
    throw new Error("Order not found")
  }
  }
})



export {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDelivered,updateCountInStock}
