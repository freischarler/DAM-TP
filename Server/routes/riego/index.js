var express = require('express');
var routerRiego = express.Router();
var pool = require('../../mysql');


//Espera recibir por parámetro un id de dispositivo y devuelve el ultimo estado
routerRiego.get('/:electrovalvulaId', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });
});

//Espera recibir por parámetro un id de dispositivo y devuelve todos los riegos
routerRiego.get('/:electrovalvulaId/todas', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Espera recibir por parámetro un id de dispositivo y un valor de medición y lo inserta en base de datos.
routerRiego.post('/agregar', function(req, res) {
    console.log(req.body.apertura);
    console.log(req.body.fecha);
    console.log(req.body.electrovalvulaId);
    
    /*
    INSERT INTO `Log_Riegos` (`logRiegoId`, `apertura`, `fecha`, `electrovalvulaId`) VALUES (NULL, '0', '2020-08-15 10:58:00', '1');
    {
        "apertura": "0",
        "fecha":"2020-08-15 11:12:01",
        "electrovalvulaId": "1"
    }
    */
    
    
    pool.query('INSERT INTO Log_Riegos (apertura, fecha , electrovalvulaId) values (?,?,?)',
     [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerRiego;