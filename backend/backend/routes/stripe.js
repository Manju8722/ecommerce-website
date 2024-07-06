const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe");
const Order = require("../model/order");
const stripe = require("stripe")(
  "sk_test_51NubCHSB0GJQPeBHgbp9pfR5Zc2mjwBPu5ecfbLBBqXgbjGuKoxqVf28RkpE6s7VVk6wEkF0bBtSZ7GQx2FinIPX000ULrKIgN"
);
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_f4fe932461367140089748a63991e04ed72eff2f0010ebd2901c4cf15c6df560";

async function createOrder(customer, data) {
  //   console.log("json paring :");
  //   const i = JSON.parse(customer.metadata.cart);
  //   console.log(i);
  const orderItems = JSON.parse(customer.metadata.cart)?.map((product) => {
    return {
      productId: product.productId,
      productPrice: product.productPrice,
      quantity: product.quantity,
    };
  });
  const order = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    total: data.amount_total,
    cart: orderItems,
    payment_status: data.payment_status,
    subtotal: data.amount_subtotal,
    shipping: data.customer_details,
  });
  try {
    const newOrder = await order.save();
    // console.log("new order:");
    // console.log(newOrder);
  } catch (error) {
    console.log(error);
  }
}
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    const rawBody = request.rawBody;

    let event;
    let data;
    let eventType;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
      console.log("verified event: ");
      data = event.data.object;
      eventType = event.type;
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (eventType == "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          //   console.log("customer:");
          //   console.log(customer);
            console.log("data: ");
            console.log(data);
          createOrder(customer, data);
        })
        .catch((err) => console.log(err));
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// router.use(express.json());

router.post("/stripe-checkout", stripeController.post_checkout_stripe);

module.exports = router;
