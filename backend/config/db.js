import mongoose from "mongoose";


export const connectDb = async () =>{

  try {
    
  const connect = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDb connected ${connect.connection.host}, ${connect.connection.name}`)
    
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1);
    
  }

}
