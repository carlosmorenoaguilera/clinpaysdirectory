const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const response = require('./response');
const clientStore = require('./storage');
//------------------- init server config ----------------------//

var app = express();
app.use(bodyParser.json());
app.use(router);

// -----------------------------------------------------------//

router.get('/', function (req, res) {
  const clients = clientStore.getAllClients().then((data) => {
    console.log(data)
    res.send(data);
  })
    .catch(e => {
      res.send(e);
    });
});

router.get('/id/:id', function (req, res) {
  const client = clientStore.getClientById(req.params.id).then((data) => {
    response.success(req, res, data, 200);
  }).catch(e => {
    response.failed(req, res, e, 404)
  })

});

router.post('/', function (req, res) {
  const clientBody = req.body;
  if (!clientBody.FirstName || !clientBody.LastName || !clientBody.PhoneNumber) {
    response.failed(req, res, "Error en parametros", 400)
  }

  const queryResult = clientStore.addClient(req.body).then((data) => {
    response.success(req, res, "Success", 201);
  })
    .catch(e => {
      response.failed(req, res, "Error telefono duplicado", 400);
    });

});

router.put('/', function (req, res) {

  const clientRecordForUpdate = clientStore.updateById(req.body).then((data) => {
    response.success(req, res, data, 200);
  })
    .catch(e => {
      response.failed(req, res, e, 400)

    })

});

router.delete('/id/:id', function (req, res) {
  const client = clientStore.deleteById(req.params.id).then((data) => {
    response.success(req, res, data, 200);
  }).catch(e => {
    response.failed(req, res, e, 404)
  })

});



router.get('/phone/:phone', function (req, res) {
  const client = clientStore.getClientByPhoneNumber(req.params.phone).then((data) => {
    response.success(req, res, data, 200);
  }).catch(e => {
    response.failed(req, res, e, 404)
  })

});



//---Mantener como ultima ruta para escapar 404 -----------//
app.get('*', function (req, res) {
  response.notfound(req, res, "not found", 404);
});
//------------------- start server  ----------------------//

app.listen(3001);
console.log("listen on 3001");

// -----------------------------------------------------------//