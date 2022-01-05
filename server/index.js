const express = require('express');

const app = express();

app.use((req, res) => {
  console.log(req.headers);
  res.send('hello world');
});

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
