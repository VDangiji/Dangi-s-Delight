import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://virendradangi285_db_user:fooddelivery123@fooddelivery.iafif3c.mongodb.net/?retryWrites=true&w=majority&appName=fooddelivery')
    .then(() => console.log('DB CONNECTED'));
}

export default connectDB; 