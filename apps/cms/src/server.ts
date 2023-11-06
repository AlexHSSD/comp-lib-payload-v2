import express from 'express';
import payload from 'payload';
import email from './email/transport';
import path from 'path';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

const PORT = process.env.PAYLOAD_LOCAL_PORT || 8000;

const start = async () => {
  // Initialize Payload
  await payload.init({
    // Make sure that your environment variables are filled out accordingly
    secret: process.env.PAYLOAD_SECRET as string,
    mongoURL: process.env.MONGODB_URI as string,
    email: email,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(PORT);
}

start();
