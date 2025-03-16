import { data } from "react-router-dom";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  console.log(req);
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    console.log("Bhaiji add food  m error aa gya")
    res.json({ success: false, message: "Error " });
  }
};
// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Bhaiji food lsit m error aa gya");
    res.json({ success: false, message: "Error" });
  }
};
// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food Removed",
    });
  } catch (error) {
    console.log("Bhai jiiii  foodremove error aa gya");
    res.json({success:false,message:"Error"})
  }
};
export { addFood, listFood, removeFood };
