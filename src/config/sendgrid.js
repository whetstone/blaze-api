import sendgrid from 'sendgrid';
import { promisifyAll } from 'bluebird';

export default promisifyAll(sendgrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD));
