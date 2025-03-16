import mongoose from "mongoose";
export const connectDB=async()=>{
   try {
    await mongoose.connect('mongodb+srv://Tomato:Tomato@cluster0.evesm.mongodb.net/food-delivery')
    console.log("DB connected Successfully")
   } catch (error) {
    console.log(error)
   }
   
}