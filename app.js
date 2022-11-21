const express = require('express');
const cors = require('cors');
const logger = require('morgan'); //for seeing api calls in terminal
const PORT = process.env.PORT || 3000;
const app = new express();

require('./middleware/MongoDB');

app.use(cors()); //to connect backend and frontend without disturbance
app.use(express.json()); //to receive data from front end
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/frontend')));

const api = require('./routes/api');
app.use(api);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})