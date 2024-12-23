import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(
      `MONGO_URI=mongodb+srv://manithri7:JjdbYchwQeSF8VJA@cluster0.t2djb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connection to mongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
