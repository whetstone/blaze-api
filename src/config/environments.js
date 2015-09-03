const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/giftrej-api-v3';
  process.env.SENDGRID_USERNAME = 'sendgrid_username';
  process.env.SENDGRID_PASSWORD = 'sendgrid_password';
}
