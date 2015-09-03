const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.POSTGRES_URI = 'postgres://postgres:postgres@localhost:5432/giftrej-api-v3';
  process.env.SENDGRID_USERNAME = 'app30383775@heroku.com';
  process.env.SENDGRID_PASSWORD = 'tqr1ia8h1337';
}
