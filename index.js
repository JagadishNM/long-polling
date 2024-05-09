const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5111;

let waitingClients = [];
let data = 'Initial data';

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
});

// get data
app.get('/getData', (req, res) => {
	if (data !== req.query.lastData) {
		res.json({ data });
	} else {
		waitingClients.push(data);
	}
});

// update data
app.get('/updateData', (req, res) => {
	data = JSON.parse(req.query.data);
	// while (waitingClients.length > 0) {
	// 	console.log(waitingClients.pop());
	// }

	res.send({ success: 'data updated' });
});

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
