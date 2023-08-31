const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { PORT, MONGODB, origin } = require('./config');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const handlerError = require('./middlewares/handlerError');

mongoose.connect(MONGODB);
mongoose.set('strictQuery', false);

const app = express();
app.use(cors({ origin }));
app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(cookieParser());

app.use(require('./routes'));

app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => console.info('Server is started on port:', PORT));
