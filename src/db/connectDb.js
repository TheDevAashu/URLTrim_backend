 import mongoose from "mongoose";


async function connectToDb() {
  try {
    // console.log("Vercel is trying to connect with this URI:", process.env.MONGO_URI);
    
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log("Data base connected succesfully");
  } catch (error) {
    console.log("Error in connecting database " + error);
    throw error; 
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