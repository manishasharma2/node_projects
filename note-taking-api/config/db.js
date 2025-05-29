// connect to database

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB connected Successfully`);
        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = connectDB;