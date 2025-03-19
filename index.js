const express = require("express");
const app = express();

//DB IMPORT
const { initialiseDatabase } = require("./db/db.connect.js");

//MODELS IMPORT
const Product = require("./models/product.model.js");
const Address = require("./models/address.model.js");
const Profile = require("./models/profile.model.js");
const Order = require("./models/order.model.js");

initialiseDatabase();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173", "https://frontend-03-phi.vercel.app"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("EOUS! BUILD YOUR STATE-OF-ART GAMING PC's");
});

// const addDataToDb = async (data, obj) => {
//   try {
//     const dataAdded = await obj.insertMany(data);
//     console.log("Data added successfully: ", dataAdded);
//   } catch (error) {
//     console.log("UNABLE TO ADD THE DATA TO DB", error);
//   }
// };

// addDataToDb(mockPcBuilds, Order);

//READ ALL PRODUCTS
app.get("/api/get-all-products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PRODUCTS" });
  }
});

//READ PRODUCTS THROUGH ID
app.get("/api/get-product/:productId", async (req, res) => {
  try {
    const products = await Product.findById(req.params.productId);

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PRODUCTS" });
  }
});

//READ PRODUCTS THROUGH CATEGORY
app.get("/api/get-all-products/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PRODUCTS" });
  }
});

//READ WISHLISTED PRODUCTS
app.get("/api/get-wishlisted-products", async (req, res) => {
  try {
    const products = await Product.find({ isWishlisted: true });

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PRODUCTS" });
  }
});

//READ CART PRODUCTS
app.get("/api/get-cart-products", async (req, res) => {
  try {
    const products = await Product.find({ isAddedToCart: true });

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PRODUCTS" });
  }
});

//UPDATE WISHLIST
app.put("/api/update-wishlist/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: { isWishlisted: !product.isWishlisted } },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO UPDATE THE PRODUCT" });
  }
});

//UPDATE CART
app.put("/api/update-cart/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      [{ $set: { isAddedToCart: { $not: "$isAddedToCart" } } }],
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PRODUCTS" });
  }
});

//CRUD OPERATIONS FOR ADDRESSES

//CREATE ADDRESS
app.post("/api/post-address", async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();

    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO POST THE ADDRESSES" });
  }
});

//READ ADDRESS
app.get("/api/get-address", async (req, res) => {
  try {
    const addresses = await Address.find();

    res.status(200).json(addresses);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE ADDRESSES" });
  }
});

//UPDATE ADDRESS
app.put("/api/put-address/:addressID", async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.addressID,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO UPDATE THE ADDRESS" });
  }
});

//DELETE ADDRESS
app.delete("/api/delete-address/:addressID", async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(
      req.params.addressID,
      { new: true }
    );

    res.status(200).json(deletedAddress);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO DELETE THE ADDRESS" });
  }
});

//CRUD OPERATIONS FOR PROFILES

//CREATE PROFILES
app.post("/api/post-profiles", async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO POST THE PROFILES" });
  }
});

//READ PROFILES
app.get("/api/get-profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();

    res.status(200).json(profiles);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO FIND THE PROFILES" });
  }
});

//UPDATE PROFILES
app.put("/api/put-profile/:profileID", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileID,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "UNABLE TO UPDATE THE PROFILE" });
  }
});

//DELETE PROFILES
app.delete("/api/delete-profile/:profileID", async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(
      req.params.profileID,
      { new: true }
    );

    res.status(200).json(deletedProfile);
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO DELETE THE PROFILE" });
  }
});

//POST ORDER
app.post("/api/post-order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(404).json({ error: "UNABLE TO POST THE ORDER" });
  }
});

app.get("/api/get-orders" , async (req, res) => {
  try {
    const orders = await Order.find()

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({error: "UNABLE TO GET THE ORDERS"})
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log("APP IS LISTENING TO 3000 PORT");
});
