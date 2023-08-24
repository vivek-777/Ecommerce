const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/e-comm");

const connectDB = async () => {
  const productSchema = new mongoose.Schema({});
  const product = mongoose.model("products", productSchema);
  const data = await product.find();
  //   console.log(data);
};

connectDB();
