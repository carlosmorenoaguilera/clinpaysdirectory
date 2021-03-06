//------ Validador de cliente ----//

function clientValidation(client) {
    const { FirstName, LastName, PhoneNumber } = client;
    if (typeof PhoneNumber === 'number') {
        throw new Error("Numero de telefono debe de ser String");
    }

    if (PhoneNumber == '911') {
        throw new Error("no puede ser 911");
    }

    if (/.*\d.*/.test(FirstName)) {
        throw new Error("FirstName no puede contener numeros");
    }

    if (/.*\d.*/.test(LastName)) {
        throw new Error("LastName no puede contener numeros");
    }
    if (!/^[A-Z]/.test(FirstName)) {
        throw new Error("FirstName, la primera letra debe de ser mayuscula");

    }
    if (!/^[A-Z]/.test(LastName)) {
        throw new Error("LastName, la primera letra debe de ser mayuscula");

    }



    return "ok"
}

module.exports = {
    clientValidation,
};