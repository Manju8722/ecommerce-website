const express = require("express");
// import express from "express";
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth_route = require("./routes/auth");
const product_route = require("./routes/product");
const cart_route = require("./routes/cart");
const mail = require("./routes/mail");
const stripe_route = require("./routes/stripe");

const order_route = require("./routes/order");

const path = require("path");

const profile_route = require("./routes/profile");

const authMiddleware = require("./middleware/auth");

const app = express();
//const username = "vuedev";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith("/api/v1/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`method - ${req.method} with url ${req.url}`);
  next();
});
// user setting middleware
app.use(authMiddleware);

// auth routes started

app.use("/api/v1", stripe_route);

app.use("/api/v1", auth_route);

app.use("/api/v1", product_route);

app.use("/api/v1", cart_route);

app.use("/api/v1", order_route);

app.use("/api/v1", profile_route);

app.use("/api/mail", mail);
// auth routes ended

app.all("*", (req, res) => {
  console.log(req.url + "not found");
  return res.status(404).json({ message: `${req.url} not found` });
});
const password = "5gEGun8SXK7ep0jG";
mongoose
  .connect(
    `mongodb+srv://user_temp_1:${password}@cluster0.dnv6vok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("connected to db succesfully");
    app.listen(5000, () => {
      console.log("started server in 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
