let email
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
if ( process.env.PAYLOAD_MAILGUN_API_KEY) {
  const auth = {
    auth: {
      api_key: process.env.PAYLOAD_MAILGUN_API_KEY,
      domain: process.env.PAYLOAD_MAILGUN_SENDING_DOMAIN,
    },
    url: process.env.PAYLOAD_MAILGUN_URL || 'https://api.eu.mailgun.net'
  }

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  if (/*process.env.NODE_ENV === 'production' && */ nodemailerMailgun) {
    email = {
      fromName: 'PayloadCMS',
      fromAddress: 'no-reply@mg.surescreen.com',
      transport: nodemailerMailgun
    }
  }
} else {
  email = {
    fromName: 'Local PayloadCMS',
    fromAddress: 'david.barton@surescreen.com',
    logMockCredentials: true,
  }
}

export default email