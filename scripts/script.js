
$(document).ready(function () {

    $("#inputCep").mask('00000-000');// Mascara cep
});
var users = []; // array vazio para receber os usuarios





function searchCep() {
    var cep = document.getElementById("inputCep").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    var validacep = /^[0-9]{8}$/; // validar se é um numero valido de CEP

    if (!validacep.test(cep)) { //resultado negativo da validacao de CEP entra aqui 
        document.getElementById("notFound").innerHTML = `<p class = "text-danger"> CEP invalido</p>`;
        document.getElementById("btn").disabled = true;
        document.getElementById("inputNumber").disabled = true;
    } else {
        document.getElementById("notFound").innerHTML = "";
    };


    $.getJSON(url, (cepInfo) => { 

        if (("erro" in cepInfo)) {// 
            document.getElementById("notFound").innerHTML = `<p class = "text-danger"> Não Encontrado</p>`;
            document.getElementById("inputNumber").disabled = true;
            document.getElementById("btn").disabled = true;
            document.getElementById("form").reset(); // limpar formulario
        } else {
            document.getElementById("inputAddress").value = `${cepInfo.logradouro}`;
            document.getElementById("inputBairro").value = `${cepInfo.bairro}`;
            document.getElementById("inputCidade").value = `${cepInfo.localidade}`;
            document.getElementById("inputEstado").value = `${cepInfo.uf}`;
            document.getElementById("inputNumber").disabled = false;
            document.getElementById("btn").disabled = false;
            document.getElementById("notFound").innerHTML = ``;
        }
    })

}


function saveUser() {
    let newUser = {
        userID: users.length + 1,
        userName: document.getElementById("inputNome").value,
        userLastName: document.getElementById("inputSobrenome").value,
        userCEP: document.getElementById("inputCep").value,
        userAddress: document.getElementById("inputAddress").value,
        userNumber: document.getElementById("inputNumber").value,
        userBairro: document.getElementById("inputBairro").value,
        userCidade: document.getElementById("inputCidade").value,
        userEstado: document.getElementById("inputEstado").value,
    }; // modelo do objeto que ira receber os dados do formulario 

    users.push(newUser); // adiciona este objeto ao array
    newRow(newUser);
    document.getElementById("form").reset();
}


function newRow(user) {
    const table = document.getElementById("table");
    const newRow = table.insertRow();

    const idCell = newRow.insertCell();
    const idNode = document.createTextNode(user.userID);
    idCell.appendChild(idNode);

    const nameCell = newRow.insertCell();
    const nameValue = user.userName + " " + user.userLastName;
    const nameNode = document.createTextNode(nameValue);
    nameCell.appendChild(nameNode);

    const addressCell = newRow.insertCell();
    const addressValue = user.userAddress + ", " + user.userNumber;
    const addressNode = document.createTextNode(addressValue);
    addressCell.appendChild(addressNode);

    const CepCell = newRow.insertCell();
    const CePNode = document.createTextNode(user.userCEP);
    CepCell.appendChild(CePNode);

    const bairroCell = newRow.insertCell();
    const bairroNode = document.createTextNode(user.userBairro);
    bairroCell.appendChild(bairroNode); 

    const cidadeCell = newRow.insertCell();
    const cidadeNode = document.createTextNode(user.userCidade);
    cidadeCell.appendChild(cidadeNode);

    const estadoCell = newRow.insertCell();
    const estadoNode = document.createTextNode(user.userEstado);
    estadoCell.appendChild(estadoNode);

}