import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connectDB = async () => {
  try {
    const connection = await connect(MONGODB_URI, {});
    console.log('database connected')
    return connection;
  } catch (error) {
    console.log(error);
  }
};

connectDB();

export { connectDB };
