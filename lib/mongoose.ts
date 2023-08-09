import mongoose from 'mongoose'
export const connectDB = async () => {
    mongoose.set("strictQuery", true);
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI!)
        console.log('Connected to MongoDB', connect.connection.host)
    } catch (error) {
        console.log(error);
        
    }
}