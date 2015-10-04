import './config/environments.js';

import express from 'express';
import logger from 'morgan';
import errorhandler from 'errorhandler';
import cors from 'cors';
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { setUpRoutes } from './routes/routes.js';

// Uncomment these lines to synchronize models with the database at startup
// import { syncDb } from './util/sync-db.js';
// syncDb();

const app = express();
const router = express.Router();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: true, // TODO: Configure allowed origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(errorhandler());

// HTTP Redirect to HTTPS
app.get('*', (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://whetstone-blaze.herokuapp.com' + req.url);
  }

  next();
});

// Server Status
app.get('/', (req, res, next) => {
  res.status(200).send({message: 'Whetstone Blaze API is running.'});
});

// API Routes
app.use(router);
setUpRoutes(router);

// Unauthorized Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'Invalid Token' });
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`WhetstoneBlaze is now serving at ${host}:${port}`);
});

export default app;
