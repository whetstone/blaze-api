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

function protect() {
  return expressJwt({
    secret: 'KILROY',
    getToken: function (req) {
      return req.cookies['giftrej-token'];
    },
  }).unless(req => {
    return (
      req.originalUrl === '/token' ||
      req.originalUrl === '/users' && req.method === 'POST'
    );
  });
}

// API Routes
app.use(protect(), router);
setUpRoutes(router);

// Unauthorized Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token');
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`GiftRej API v3 is now serving at ${host}:${port}`);
});

export default app;
