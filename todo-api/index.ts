import express, {
  Express,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// Instantiate the express app
const app: Express = express();
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true, // Tells TypeORM to delete databases: Do not use in Production
});

// Define server port
const port = process.env.PORT;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript server');
});

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });
