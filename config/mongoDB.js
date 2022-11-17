import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
