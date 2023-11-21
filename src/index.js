require('./models/User');
require('./models/Moves');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const movesRoutes = require('./routes/movesRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './.env' });

app.use(bodyParser.json());
app.use(authRoutes);
app.use(movesRoutes);

const mongoUri = process.env.mongoUri;

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
