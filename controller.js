var submitButton = document.querySelector('#app button')
var zipCodeField = document.querySelector('#app input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run (event) {
    event.preventDefault()

    var zipcode = zipCodeField.value

    zipcode = zipcode.replace(' ', '')
    zipcode = zipcode.replace('.', '')
    zipcode = zipcode.trim()

    axios
    .get('https://viacep.com.br/ws/' + zipcode + '/json')
    .then(function (response) {
        if (response.data.erro) {
            throw new Error ('CEP inválido')
        }
        content.innerHTML = ''
        createLine(response.data.logradouro + ', ' + response.data.bairro + ' - ' + response.data.localidade + '/' + response.data.uf)
    })
    .catch(function (error) {
        console.log(error)
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })
}

function createLine (text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)
    line.appendChild(text)
    content.appendChild(line)
}