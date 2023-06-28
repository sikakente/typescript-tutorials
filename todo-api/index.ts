import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';

// Instantiate the express app
const app: Express = express();
dotenv.config();

// Define server port
const port = process.env.PORT;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server');
});

// Start listening
app.listen(port);
