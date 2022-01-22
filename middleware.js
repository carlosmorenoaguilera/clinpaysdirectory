//------ fallido ----//
const clientStore = require("./storage");
//const { Error } = require("mongoose");
const Model = require('./model');

function clientValidation(client) {
    return new Promise(async(resolve, reject) => {
        const { id, FirstName, LastName, PhoneNumber } = client;
        console.log(PhoneNumber);
        // clientStore
        //     .getClientByPhoneNumber(PhoneNumber)
        //     .then((data) => {
        //         throw new Error("Numero de telefono duplicado");
        //     })
        //     .catch((e) => {});

        await Model.exists({ "PhoneNumber": { $regex: '.*' + PhoneNumber + '.*' } }, function(error, data) {
            if (data) {
                reject(data)
                return false;
            }
            resolve()
        });
    });
}

module.exports = {
    clientValidation,
};