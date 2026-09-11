import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows DNS ECONNREFUSED on MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is missing. Add it to server/.env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      retryWrites: true,
      dbName: 'reliefhub',
    });

    console.log(`MongoDB Atlas Connected: ${conn.connection.host} [DB: ${conn.connection.name}]`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
