const express = require('express');
const mongoose = require('mongoose');

const Alert = require('./models/Alert');

const app = express();

const mongoURL =
	process.env.MONGOURL ||
	'mongodb+srv://ronit_c:abcddcba@tourcamp.alpnh.mongodb.net/?retryWrites=true&w=majority';
const serverPort = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE'
	);
	next();
});

app.get('/', async (req, res, next) => {
	const alerts = await Alert.find({});
	return res.status(200).json({ alerts });
});

app.post('/', async (req, res, next) => {
	const { msg } = req.body;
	const date = new Date().toDateString();
	const alert = new Alert({ msg, date });
	await alert.save();
	const alerts = await Alert.find({});
	return res.status(201).json({ alerts });
});

mongoose.Promise = Promise;
mongoose
	.connect(mongoURL, {
		keepAlive          : true,
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() =>
		app.listen(serverPort, () =>
			console.log(
				`connect to DB and started server at port 3000`
			)
		)
	)
	.catch(e => console.log(e));
