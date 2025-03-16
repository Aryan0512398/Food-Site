import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Added to Cart",
    });
  } catch (error) {
    console.log("Bhai ji add cart error aa gya");
    res.json({
      success: false,
      message: "Bhai ji  add cart error aa gya",
    });
  }
};
// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Remove from Cart",
    });
  } catch (error) {
    console.log("Bhai ji cart remove m error aa gya");
    res.json({
      success: false,
      message: "Bhai ji cart remove m error aa gya",
    });
  }
};

// fetch user cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
        success:true,
        cartData
    })
  } 
  catch (error) {
    console.log("Bhai ji fetch cart error aa gya");
    res.json({
      success: false,
      message: "Bhai ji fetch cart error aa gya",
    });
  }
};

export { addToCart, getCart, removeFromCart };
