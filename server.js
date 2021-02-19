const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/ErrorController');
require('dotenv').config();

const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static('public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established sucessfully');
});

const imageRouter = require('./routes/uploadImages');
const jacuzzisRouter = require('./routes/jacuzzis');
const productsRouter = require('./routes/products');

app.use('/images', imageRouter);
app.use('/jacuzzis', jacuzzisRouter);
app.use('/products', productsRouter);

app.use(errorController);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, function () {
	console.log(`CORS-enabled web server listening on port ${port}`);
});
