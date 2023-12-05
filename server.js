const express = require("express");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const { secretKey, database } = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/router");
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

// Connecting to MongoDB using Mongoose
mongoose
  .connect(`mongodb+srv://zeeshan:zeeshan@cluster0.ljsbo.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(bp.json());
app.use(cookieParser());
app.use(bp.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(cors(corsOptions));
app.use("", router);
