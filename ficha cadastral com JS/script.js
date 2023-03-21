var UserName = document.querySelector("#nameInput");
var userRg = document.querySelector("#rgInput");
var userCpf = document.querySelector("#cpfInput");
var userAdress = document.querySelector("#adressInput");
var userBorn = document.querySelector("#bornInput");
var solteiro = document.getElementById("solteiro");
var casado = document.getElementById("casado");
var viuvo = document.getElementById("viuvo");
var button = document.getElementById("buttonClean");
var selectElement = document.querySelector("#sexo");


var radioElements = [solteiro, casado, viuvo];
var userInformation = [UserName, userRg, userCpf, userAdress, userBorn];

function cleanFields() {
    userInformation.forEach((field) => {
        field.value = "";
    })
    radioElements.forEach((i) => {
        i.checked = false;
    })
    selectElement.value = "Select";
}

button.addEventListener("click", cleanFields);