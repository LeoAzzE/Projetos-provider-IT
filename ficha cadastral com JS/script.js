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
var sc = document.querySelector("input[name='sc']:checked")
var body = document.getElementById('body')
var radioElements = [solteiro, casado, viuvo]
var userInformation = [userName, userRg, userCpf, userAdress, userBorn]

array = []

var db = openDatabase('mydb', '1.0', 'cadastro de pessoas', 2 * 1024 * 1024)
  db.transaction(function (tx) {
    tx.executeSql(
      'create table if not exists people(name, rg, cpf, end, nasc, sexo, sc)'
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

dataListOnScreen()
function dataListOnScreen() {
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
          str += '<td>' + results.rows.item(i).end + '</td>'
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
    }
    )
}

function insertData() {
  event.preventDefault
  let sCivil = radioElements.map((e)=> {
    if(e.checked) {
        return e.value
    }
  })
  people = {
    name: userName.value,
    rg: userRg.value,
    cpf: userCpf.value,
    end: userAdress.value,
    nasc: userBorn.value,
    sexo: sexo.value,
    situacaoCivil: sCivil
  }
  array.push(people)
  db.transaction(function (tx) {
    for(let p of array) {
      tx.executeSql(
        'insert into people(name, rg, cpf, end, nasc, sexo, sc) values (?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.rg, p.cpf, p.end, p.nasc, p.sexo, p.situacaoCivil]);
      }
    }) //window.location.reload(true)
  }
