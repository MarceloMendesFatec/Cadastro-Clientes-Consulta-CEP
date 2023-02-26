
$(document).ready(function () {
    
    $("#inputCep").mask('00000-000');
});
var users = []; // array vazio para receber os usuarios





function searchCep() {
    var cep = document.getElementById("inputCep").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;


    $.getJSON(url, (cepInfo) => {
      
      if(("erro" in cepInfo)){
          document.getElementById("notFound").innerHTML = `<p class = "text-danger"> CEP invalido</p>`;
          document.getElementById("inputNumber").disabled = true;
          document.getElementById("btn").disabled = true;
      }else{
          document.getElementById("inputAddress").value = `${cepInfo.logradouro}`;
          document.getElementById("inputBairro").value = `${cepInfo.bairro}`;
          document.getElementById("inputCidade").value = `${cepInfo.localidade}`;
          document.getElementById("inputEstado").value = `${cepInfo.uf}`;
          document.getElementById("inputNumber").disabled = false;
          document.getElementById("btn").disabled = false;
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

    users.push(newUser);
    newRow(newUser);
    document.getElementById("form").reset();
}


function newRow(user) {
    let table = document.getElementById("table");
    let newRow = table.insertRow();

    let idCell = newRow.insertCell();
    let idNode = document.createTextNode(user.userID);
    idCell.appendChild(idNode);

    let nameCell = newRow.insertCell();
    let nameValue = user.userName + " " + user.userLastName;
    let nameNode = document.createTextNode(nameValue);
    nameCell.appendChild(nameNode);

    let addressCell = newRow.insertCell();
    let addressValue = user.userAddress + ", " + user.userNumber;
    let addressNode = document.createTextNode(addressValue);
    addressCell.appendChild(addressNode);

    let CepCell = newRow.insertCell();
    let CePNode = document.createTextNode(user.userCEP);
    CepCell.appendChild(CePNode);

   let bairroCell = newRow.insertCell();
   let bairroNode = document.createTextNode(user.userBairro);
   bairroCell.appendChild(bairroNode);

   let cidadeCell = newRow.insertCell();
   let cidadeNode = document.createTextNode(user.userCidade);
   cidadeCell.appendChild(cidadeNode);

   let estadoCell = newRow.insertCell();
   let estadoNode = document.createTextNode(user.userEstado);
   estadoCell.appendChild(estadoNode);

}