const mongoose = require("mongoose");

const Product = require("../model/product");

async function seedProducts() {
  try {
    const password = "5gEGun8SXK7ep0jG";
    mongoose.connect(
      `mongodb+srv://user_temp_1:${password}@cluster0.dnv6vok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    const json = await fetch("https://fakestoreapi.com/products");
    const products = await json.json();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Product Data seed Succesfully ....!");
  } catch (error) {}
}

seedProducts();
