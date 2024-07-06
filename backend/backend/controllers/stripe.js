const stripe = require("stripe")(
  "sk_test_51NubCHSB0GJQPeBHgbp9pfR5Zc2mjwBPu5ecfbLBBqXgbjGuKoxqVf28RkpE6s7VVk6wEkF0bBtSZ7GQx2FinIPX000ULrKIgN"
);
const post_checkout_stripe = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        cart: JSON.stringify(
          req.body.productDetail.map((product) => {
            return {
              productId: product.productId._id,
              productPrice: product.productPrice,
              quantity: product.quantity,
            };
          })
        ),
      },
    });
    const line_items = req.body.productDetail.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productId.title,
            images: [product.productId.image],
            description: product.productId.description,
          },
          unit_amount: Math.round(product.productPrice) * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      customer: customer.id,
      mode: "payment",
      success_url: "http://localhost:3000/products/success",
      cancel_url: "http://localhost:3000/products/cancel",
    });
    return res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { post_checkout_stripe };
