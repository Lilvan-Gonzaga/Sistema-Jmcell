import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://lilvangonzaga:amomeuspais20@jmcell-api.j0gft.mongodb.net/?retryWrites=true&w=majority&appName=jmcell-api';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB conectado com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err.message);
        process.exit(1);
    }
};

export default connectDB;
