'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const debug = require('debug')('cfgram:server');

const authRouter = require('./route/auth-router.js');
const errors = require('./lib/error-middleware');

dotenv.load();

const PORT = process.env.PORT;
const app = express();


mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(authRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up on ${PORT}`);
});
