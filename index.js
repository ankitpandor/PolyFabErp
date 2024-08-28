const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const salesOrderRoutes = require('./routes/salesorderRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/customer', customerRoutes);
app.use('/salesorder', salesOrderRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
