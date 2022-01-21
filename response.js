exports.success = function (request, response, msj, status){

    response.status(status || 200).send({
        error: "",
        msj: msj

    });
}

exports.failed = function (request, response, msj, status){
    response.status(status || 500).send({
        error: msj, 
        message: ""
    });
}

exports.notfound  = function (request, response, msj, status){
    response.status(status || 404).send({
        error: msj, 
        message: "trying to access  => " + request.originalUrl
    });
}