import express, {
  Express,
  Request,
  Response,
} from 'express';

// Instantiate the express app
const app: Express = express();

// Define server port
const port = 3200;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server');
});

// Start listening
app.listen(port);
