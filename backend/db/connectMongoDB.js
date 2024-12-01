import mongoose from "mongoose";//Obj Data Model for node an d mongo


const connectMongoDB = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default connectMongoDB;