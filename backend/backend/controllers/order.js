const Order = require("../model/order");

const get_orders = async (req, res) => {
  try {
    const user = req.user;
    const orderProducts = await Order.find({
      userId: user.id,
    })
      .populate("cart.productId")
      .lean();
    if (!orderProducts.length) {
      return res
        .status(422)
        .json({ meassge: "No Order Has been Made By User Yet " });
    }
    return res.status(200).json(orderProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const get_order_by_id = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = req.user;
    const orderProduct = await Order.findById(_id)
      .populate("cart.productId")
      .lean();
    if (!orderProduct) {
      return res.status(422).json({ meassge: "order not found" });
    }
    return res.status(200).json(orderProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { get_orders, get_order_by_id };
