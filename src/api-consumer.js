const ngrok = require('ngrok');
const axios = require('axios');
// const connect = require('connect');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// const http = require('http');
// const app = connect();

class ApiConsumer {
  constructor(callback) {
    this._callback = callback;
    this.addWebhook();


    app.use('/', (req, res) => {
      this._callback(req.body);
      console.log('Webhook called !', req.body);
      res.send('🦄');
    });

    app.listen(process.env.HTTP_PORT, () => {
      console.log(`Server running on ${process.env.HTTP_PORT}...`);
    });
  }

  async addWebhook() {
    const ngrok_url = await ngrok.connect(process.env.HTTP_PORT);
    console.log(`HTTP tunnel on ${ngrok_url}`);

    try {
      const api_url = `${process.env.BASE_URL}Matcher/AddMatchWebhook`;
      await axios.post(api_url, {
        matchWebhook: ngrok_url
      }, {
        params: {
          matcherGuid: process.env.MATCHER_GUID,
        },
        headers: {
          'Authorization': `Bearer ${process.env.JWT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Webhook added 👍');
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = ApiConsumer;
