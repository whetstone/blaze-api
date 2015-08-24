import sendgrid from 'sendgrid';
import { promisifyAll } from 'bluebird';

export default promisifyAll(sendgrid('app30383775@heroku.com', 'tqr1ia8h1337'));
