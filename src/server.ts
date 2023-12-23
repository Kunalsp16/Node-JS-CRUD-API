import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import { Request, Response, NextFunction } from 'express';



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// Handling non-existing endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

// Handling errors on the server side
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 console.error(err.stack);
 res.status(500).json({ error: 'Internal Server Error' });
  });


export default app;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});



