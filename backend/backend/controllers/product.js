const Product = require("../model/product");

const get_products = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const get_product_by_id = async (req, res) => {
  try {
    
    const { id } = req.params;
    
    const product = await Product.findOne({ id });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { get_products, get_product_by_id };
