const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;
//DATABASE GLOBAL LEVEL
global.db = {
  users: [],
  address: []
}

app.use(express.json());

//HEALTHCHECK ROUTE
app.get('/', (req, res) => {
  console.log('THEN I RAN');
    return res.status(200).send({ status: 'live', version: '1.0.0' });
});

app.use('/', routes);


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});