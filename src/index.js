const express = require('express');
const bodyParser = require('body-parser');
const diagnosisRoutes = require('./routes/diagnosisRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Mount the routes
app.use('/api/diagnosis', diagnosisRoutes);

app.listen(port, () => {
  console.log(`AI Service listening on port ${port}`);
});
