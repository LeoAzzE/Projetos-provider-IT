var userName = document.querySelector('#nameInput')
var userRg = document.querySelector('#rgInput')
var userCpf = document.querySelector('#cpfInput')
var userAdress = document.querySelector('#adressInput')
var userBorn = document.querySelector('#bornInput')
var solteiro = document.getElementById('solteiro')
var casado = document.getElementById('casado')
var viuvo = document.getElementById('viuvo')
var sexo = document.querySelector('#sexo')
var button = document.getElementById('buttonClean')
var body = document.getElementById('body')
var cep = document.getElementById('cep')
var bairro = document.getElementById('bairro')
var city = document.getElementById('city')
var comp = document.getElementById('comp')
var number = document.getElementById('number')

var form = document.getElementById('form')
var radioElements = [solteiro, casado, viuvo]
var userInformation = [userName, userRg, userCpf, userAdress, userBorn, cep, bairro, city, comp]
array = []

var db = openDatabase('mydb', '1.0', 'cadastro de pessoas', 2 * 1024 * 1024)
db.transaction(function (tx) {
  tx.executeSql(
    'create table if not exists people(name, rg, cpf, cep, end, city, bairro, number, comp, nasc, sexo, sc)'
  )
})

function cleanFields() {
  userInformation.forEach(field => {
    field.value = ''
  })
  radioElements.forEach(i => {
    i.checked = false
  })
  sexo.value = ''
}

button.addEventListener('click', cleanFields)
buttonInclude.addEventListener('click', insertData)

  db.transaction(function (tx) {
    tx.executeSql(
      'select * from people',
      [],
      function (tx, results) {
        var n = results.rows.length,i
        var str = ''
        for (i = 0; i < n; i++) {
          str += '<tr>'
          str += '<td>' + results.rows.item(i).name + '</td>'
          str += '<td>' + results.rows.item(i).rg + '</td>'
          str += '<td>' + results.rows.item(i).cpf + '</td>'
          str += '<td>' + results.rows.item(i).cep + ", " +  results.rows.item(i).end + ", " + results.rows.item(i).city +
          ", " + results.rows.item(i).bairro + ", " + results.rows.item(i).number + results.rows.item(i).comp + '</td>'
          str += '<td>' + results.rows.item(i).nasc + '</td>'
          str += '<td>' + results.rows.item(i).sexo + '</td>'
          str += '<td>' + results.rows.item(i).sc + '</td>'
          str += '</tr>'
          document.getElementById('tbody').innerHTML += str
          str = ''
        }
      },
      null
    )
  })


function insertData() {

  let sc = document.querySelector("input[name='sc']:checked")
  people = {
    name: userName.value,
    rg: userRg.value,
    cpf: userCpf.value,
    cep: cep.value,
    end: userAdress.value,
    city: city.value,
    bairro: bairro.value,
    number: number.value,
    comp: comp.value,
    nasc: userBorn.value,
    sexo: sexo.value,
    sc: sc.value
  }
  array.push(people)
  db.transaction(function (tx) {
    if (isValidForm) {
      for (let p of array) {
        tx.executeSql(
          'insert into people(name, rg, cpf, cep, end, city, bairro, number, comp, nasc, sexo, sc) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.rg, p.cpf, p.cep, p.end, p.city, p.bairro, p.number ,p.comp, p.nasc, p.sexo, p.sc]
        )
      }
    }
  },window.location.reload())
}

cep.addEventListener('keyup', e => {
  const inputValue = e.target.value

  if (inputValue.length === 8) {
    consultaEndereco(cep.value)
  }
})

const consultaEndereco = async cep => {
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

  const response = await fetch(apiUrl)

  const data = await response.json()

  document.getElementById('bairro').value = data.bairro
  document.getElementById('city').value = data.localidade
  document.getElementById('adressInput').value = data.logradouro
  document.getElementById('comp').value = data.document

  if (data.erro) {
    setError(3)
  }
  else {
    removeError(3)
  }

  if (document.getElementById('comp').value === 'undefined') {
    document.getElementById('comp').value = ''
  }
  if (document.getElementById('bairro').value === 'undefined') {
    document.getElementById('bairro').value = ''

  }
  if (document.getElementById('city').value === 'undefined') {
    document.getElementById('city').value = ''
  }
  if (document.getElementById('adressInput').value === 'undefined') {
    document.getElementById('adressInput').value = ''
  }

}

const requireds = document.querySelectorAll('.required')
const p = document.querySelectorAll('.msgError')
const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/
const rgRegex = /^\d{1,2}.?\d{3}.?\d{3}-?\d{1}|X|x$/
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
const cepRegex = /^[0-9]{5}-?[0-9]{3}$/



                          //VALIDAÇÃO APOS O CLIQUE NO BOTAO DE SUBMIT (INCLUIR)
let isValidForm = false
form.addEventListener('submit', e => {
  e.preventDefault()
  validadeFields()

})

function setError(index) {
  requireds[index].style.border = '1px solid #e63636'
  p[index].style.display = 'block'

}

function removeError(index) {
  requireds[index].style.border = ''
  p[index].style.display = 'none'

}

function validadeFields() {
  isValidForm = true

  if (requireds[0].value.length < 3 || !nameRegex.test(requireds[0].value)) {
    isValidForm = false
    setError(0)
  } 

  if (requireds[1].value.length < 12 || !rgRegex.test(requireds[1].value)) {
    isValidForm = false
  } 

  if (requireds[2].value.length < 14 || !cpfRegex.test(requireds[2].value)) {
    isValidForm = false
  }

  if(requireds[3].value.length < 8 || !cepRegex.test(requireds[3].value)) {
    isValidForm = false
  }

  if(requireds[4].value.length < 3) {
    isValidForm = false
  }

  if (requireds[5].value.length < 3) {
    isValidForm = false
  }

  if (requireds[6].value.length < 6) {
    isValidForm = false
  }

  if (requireds[7].value.length < 1) {
    isValidForm = false
  }

  if (requireds[8].value === "") {
    isValidForm = false
  }

  if(requireds[9].value.length < 10) {
    isValidForm = false
  }


}

//MENSAGEM DE VALIDAÇÃO INDIVIDUAL DOS CAMPOS
function nameMsg() {
  if (requireds[0].value.length < 2 || !nameRegex.test(requireds[0].value)) {
    setError(0)
  }
  else {
    removeError(0)
  }
}

function rgMsg() {
  if (requireds[1].value.length < 11 || !rgRegex.test(requireds[1].value)) {
    setError(1)
  } 
  else {
    removeError(1)
  }
}

function cpfMsg() {
  if (requireds[2].value.length < 14 || !cpfRegex.test(requireds[2].value)) {
    setError(2)

  }
  else {
    removeError(2)
  }
}

function cepMsg() {
  if(requireds[3].value.length < 8 || !cepRegex.test(requireds[3].value)) {
    setError(3)
  }
  else {
    removeError(3)
  }
}

function bairroMsg() {
  if(requireds[4].value.length < 3) {
    setError(4)
  }
  else {
    removeError(4)
  }
}

function cityMsg() {
  if (requireds[5].value.length < 3) {
    setError(5)
  } else {
    removeError(5)
  }
}

function endMsg() {
  if (requireds[6].value.length < 6) {
    setError(6)
  } else {
    removeError(6)
  }
}

function numberMsg() {
  if (requireds[7].value.length < 1) {
    setError(7)
  } else {
    removeError(7)
  }
}

function sexoMsg() {
  if (requireds[8].value.length === "") {
    alert('Selecione uma das opções de sexo')
  } 
}

function nascMsg() {
  if(requireds[9].value.length < 10) {
    setError(9)
  }
  else {
    removeError(9)
  }
}

