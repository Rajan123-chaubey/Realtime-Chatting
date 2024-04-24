import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL,)
        console.log("Successfully connected to DB");

    }
    catch(err){
        console.log("Failed to connect TO DB", err.message);
    }
}

export default connectToMongoDB;