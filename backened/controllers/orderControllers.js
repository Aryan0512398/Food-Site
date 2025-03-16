import { data } from "react-router-dom";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_KEY)
// Placing user order from frontend
const placeOrder=async(req,res)=>{
    console.log("Hello")
    const frontend_url="http://localhost:5173"
    console.log(req.body.amount)
    try {
        console.log("Kya yha pe aaye")
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        console.log("Yha pe aagye")
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"usd",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:"usd",   
                product_data:{
                name:"Delivery Charges"
            },
            unit_amount:4*100
        },
        quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        console.log("Bhai ji order m Error aa gya")
        res.json({
            success:false,
            message:"Bhai ji order m Error aa gya"
        })
    }
}
const verifyOrder=async(req,res)=>{
    const{orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Payment Successful"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        console.log("Bhai ji verify order m error aa gya")
        res.json({success:false,message:"Error aa gya ji"})
    }
}
// User order for frontend
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        console.log("Bhai ji userOrder m error aa gya");
        res.json({success:false,message:"Error"})
    }
}
// Listing orders for admin panels
const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        console.log("Bhai ji list order m error aa gya")
    }
}
// api for updating order status
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({
            success:true,message:"Status Updated"
        })
    } catch (error) {
        console.log("Bhai ji updateStatus m error aa gya");
        res.json({success:false,message:"Bhai ji updateStatus m error aa gya"})
    }
}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}