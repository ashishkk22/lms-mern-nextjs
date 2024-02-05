import mongoose from "mongoose";
require("dotenv").config();

const dbUrl = process.env.DB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then(data => {
      console.log(`Database connected successfully ! ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error?.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
