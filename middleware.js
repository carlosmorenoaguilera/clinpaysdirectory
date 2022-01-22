const clientStore = require('./storage');

function clientValidation(client) {
const {id,FirstName,LastName, PhoneNumber} = client
clientStore.getClientByPhoneNumber(PhoneNumber).then((data) => {
            throw new Error('Numero de telefono duplicado'); 
       
      }).catch(e => {});

}

module.exports = {
    clientValidation,
}