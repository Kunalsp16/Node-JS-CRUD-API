import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// Handling non-existing endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
