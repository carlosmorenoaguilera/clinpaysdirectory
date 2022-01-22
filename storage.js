const fs = require('fs');
const dbase = require('mongoose');
const Model = require('./model');

let settings = JSON.parse(fs.readFileSync('appsettings.json'));

// usar las promesas del scope global de forma nativa 
dbase.Promise = global.Promise; // <= para implementar promesas con controladores *pendiente* 
dbase.connect(settings["connectionStrings"]["mongoLocal"], { useNewUrlParser: true });

console.log("Base de datos conectada con exito");


function getAllClients() {
    return new Promise(async(resolve, reject) => {
        const result = await Model.find({}).lean().exec(function(e, d) {
            if (e) {
                reject(e);
            }
            resolve(d)
        });
    });
}

function addClient(client) {
    return new Promise((resolve, reject) => {
        const newClient = new Model(client);
        const queryResult = newClient.save(function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(client);
        });
    });
}

function getClientByPhoneNumber(phone) {
    return new Promise((resolve, reject) => {
        const result = Model.find({ "PhoneNumber": { $regex: '.*' + phone + '.*' } }, function(error, data) {
            if (error) {
                reject(error);
            }
            if (data.length > 1) {
                resolve(data);
            }
            reject(data);
        });
    });
}


function getClientById(id) {
    return new Promise((resolve, reject) => {
        const result = Model.findById(id, function(error, data) {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(data)
        });
    });
}

function updateById(client) {
    return new Promise((resolve, reject) => {
        const clientRecord = Model.findByIdAndUpdate(client.id, client, function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}


function deleteById(id) {
    return new Promise((resolve, reject) => {
        const result = Model.findByIdAndRemove(id, function(error, data) {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(data)
        });
    });
}

module.exports = {
    addClient: addClient,
    getAllClients: getAllClients,
    getClientByPhoneNumber: getClientByPhoneNumber,
    updateById: updateById,
    getClientById: getClientById,
    deleteById: deleteById,
    dbase: dbase
}