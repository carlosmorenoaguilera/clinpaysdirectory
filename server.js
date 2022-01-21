const express = require('express');
const router =  express.Router();
const bodyParser = require('body-parser');
const response = require('./response');
//------------------- init server config ----------------------//

var app = express();
app.use(bodyParser.json());
app.use(router);

// -----------------------------------------------------------//

router.get('/', function(req, res){
    response.success(req, res, "Succed", 201);
});

app.get('*', function(req, res){
    response.notfound(req, res, "not found", 404);
  });
//------------------- start server  ----------------------//

app.listen(3001);
console.log("listen on 3001");

// -----------------------------------------------------------//