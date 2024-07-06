const Cart = require("../model/cart");

const add_product_to_cart = async (req, res) => {
  try {
    const { productId, price, addRminus } = req.body;

    const user = req.user;
    const userCartExist = await Cart.findOne({ user_id: user.id });
    if (!userCartExist) {
      const userCartProduct = await Cart.create({
        user_id: user.id,
        quantity: 1,
        totalQuantity: 1,
        totaPrice: price,
        productDetails: [
          {
            productId,
            productPrice: price,
            quantity: 1,
          },
        ],
      });
      return res.status(201).json(userCartProduct);
    }

    const productExist = await Cart.findOne({
      user_id: user.id,
      "productDetails.productId": productId,
    });
    if (productExist) {
      const productDetail = productExist.productDetails.find((p) => {
        return p.productId == productId;
      });
      if (productDetail.quantity == 1 && addRminus == -1) {
        const totalPrice = userCartExist.totaPrice - price;
        const quantity = userCartExist.quantity + addRminus;
        const totalQuantity = userCartExist.totalQuantity + addRminus;
        const updatedCartProduct = await Cart.findOneAndUpdate(
          { user_id: user.id },
          {
            $pull: { productDetails: { productId: productId } },
            totaPrice: totalPrice,
            quantity: quantity,
            totalQuantity: totalQuantity,
          }, // Remove the matched item
          { new: true }
        );
        return res.status(202).json(updatedCartProduct);
      }
      // inside productDetail array current product qunatity calculated
      const productQuantityModified = productDetail.quantity + addRminus;
      // total products exist in cart
      const quantityModified = productExist.productDetails.length;

      // total products with thier count
      const totalQuantityModified =
        productExist.productDetails.reduce((fv, { quantity }) => {
          return (fv += quantity);
        }, 0) + addRminus;

      // total price of all products with their count except current product
      const remaingProductsPrice = productExist.productDetails
        .filter((product) => {
          return !product.productId.equals(productId);
        })
        .reduce((fv, product) => {
          return (fv += product.quantity * product.productPrice);
        }, 0);

      // current products price with their count
      const currentProductTotalPrice = productQuantityModified * price;

      const updatedCart = await Cart.findOneAndUpdate(
        { user_id: user.id, "productDetails.productId": productId },
        {
          $set: {
            "productDetails.$.quantity": productQuantityModified,
            totalQuantity: totalQuantityModified,
            quantity: quantityModified,
            totaPrice: currentProductTotalPrice + remaingProductsPrice,
          },
        }, // Update the quantity field of the matched item
        { new: true }
      );
      return res.status(202).json(updatedCart);
    }
    // product is not exist push product to cart

    const totalPrice = userCartExist.totaPrice + price;
    const quantity = userCartExist.quantity + addRminus;
    const totalQuantity = userCartExist.totalQuantity + addRminus;

    const updatedProductCart = await Cart.findOneAndUpdate(
      { user_id: user.id },
      {
        totaPrice: totalPrice,
        quantity: quantity,
        totalQuantity: totalQuantity,
        $push: {
          productDetails: {
            productId,
            productPrice: price,
            quantity: 1,
          },
        },
      }, // Push a new item object to the items array
      { new: true }
    );
    return res.status(200).json(updatedProductCart);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const get_user_cart = async (req, res) => {
  try {
    const user = req.user;

    const userCart = await Cart.findOne({ user_id: user.id })
      .populate("productDetails.productId")
      .lean();

    if (userCart) {
      return res.status(200).json({ userCart });
    }
    return res.status(200).json({ userCart: null });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const delete_cart_product = async (req, res) => {
  try {
    const user = req.user;
    const { _id } = req.params;

    const cardProducts = await Cart.findOne({
      user_id: user.id,
    });
    if (!cardProducts) {
      return res.status(500).json({
        message: "Cart Not Exist For User",
      });
    }
    const product_delete_cart = cardProducts.productDetails.find((product) => {
      return product.productId == _id;
    });
    if (!product_delete_cart) {
      return res.status(500).json({
        message: "Cannot Delete Product not exist in Cart",
      });
    }

    const {
      quantity: delete_product_quantity,
      productPrice: delete_product_price,
    } = product_delete_cart;

    const quantity = cardProducts.quantity - 1;

    const totalQuantity = cardProducts.totalQuantity - delete_product_quantity;

    const totalPrice =
      cardProducts.totaPrice - delete_product_price * delete_product_quantity;

    await Cart.findOneAndUpdate(
      { user_id: user.id },
      {
        $pull: { productDetails: { productId: _id } },
        totaPrice: totalPrice,
        quantity: quantity,
        totalQuantity: totalQuantity,
      }, // Remove the matched item
      { new: true }
    );
    return res.status(202).json({});
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ error });
  }
};
module.exports = { add_product_to_cart, get_user_cart, delete_cart_product };
