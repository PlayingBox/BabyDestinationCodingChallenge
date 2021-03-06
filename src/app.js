import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

require('./middleware')({
  app,
  bodyParser,
  routes
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
