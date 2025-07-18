 import mongoose from "mongoose";

async function connectToDb() {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/urltrim");
    console.log("Data base connected succesfully");
    // console.log(res);
    
  } catch (error) {
    console.log("Error in connecting database " + error);
    throw new error();
  }
}

async function disconnectFromDb() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log("Error while disconnecting Database " + error);
  }
}

export { connectToDb, disconnectFromDb };