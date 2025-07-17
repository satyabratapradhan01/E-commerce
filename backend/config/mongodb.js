import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const connectDB = async () => {

    mongoose.connection.on('connected', ()=>{
        console.log('Db Connected');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/e_commerce`);

}

export default connectDB