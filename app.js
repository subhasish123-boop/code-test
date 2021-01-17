const express = require('express');
const routes = require('./routes');
const { ValidationError, NotFoundError } = require('./lib/errors');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});


const port = process.env.port || 8080;

app.use(bodyParser.json());
app.use('/pets', require('./routes/index'));
app.use('/data-transform', require('./routes/api/transform'));

app.listen(port, (err) => {
    if (err) console.log('Error in server starting ', err);
    else console.log(`Server running on the port: ${port}`);
});

module.exports = app;