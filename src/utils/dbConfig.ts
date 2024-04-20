import mongoose from "mongoose";

export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error: " + err.message);
      process.exit(1);
    });
  } catch (err) {
    console.log("something went wrong during db connection: " + err);
  }
}
