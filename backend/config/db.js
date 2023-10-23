import mongoose from 'mongoose';
import createSuperAdmin from './init.js';

const connectDB = async () => {
  mongoose.connect(process.env.DB_URI)
    .then(() => {
      console.log(`MongoDB Connected`);

      createSuperAdmin();

    }).catch((error) => {
      console.error(`Error: ${error.message}`);
    })

};

export default connectDB;