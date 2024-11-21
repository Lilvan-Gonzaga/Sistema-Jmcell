import mongoose from 'mongoose';

export const connectToDatabase = () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;

  mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.cwwjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
      console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
      console.log('Erro ao conectar ao MongoDB:', err);
      process.exit(1); // Encerra a aplicação em caso de erro de conexão
    });
};
