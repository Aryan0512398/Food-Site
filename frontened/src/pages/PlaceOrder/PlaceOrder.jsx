import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const{getTotalCartAmount,token ,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder=async (event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() +4,
    };
    console.log("Order Data is ", orderData)
    let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }else{
      
      alert("Error")
    }
  }
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])
 
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" required />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" required />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" required />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required />
        <div className="multi-field">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" required />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" required />
        </div>
        <div className="multi-field">
          <input required name="pincode" onChange={onChangeHandler} value={data.pincode} type="text" placeholder="Pin Code" required />
          <input  required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" required />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Mobile No." required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2 id="Cart-Total">Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0 ? 0 :4}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0: getTotalCartAmount() + 4}</b>
            </div>
          </div>
          <button type="submit" >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
