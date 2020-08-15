var express = require('express');
const cors = require('cors')

var app = express();
var PORT = 3000;

//ruteo 
var routerDisp = require('./routes/dispositivo');
var routerMedicion = require('./routes/medicion');
var routerRiego = require('./routes/riego');

app.use(express.json());

var corsConfig={ origin: '*', optionSucessStatus:200 };
app.use(cors(corsConfig));

app.use('/api/dispositivo', routerDisp);
app.use('/api/medicion', routerMedicion);
app.use('/api/riego', routerRiego);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});