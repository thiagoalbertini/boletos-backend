const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());

server.use(express.json());

const boletos = [
    { tipo: 'Energia', valor: 300, vencimento: '20/05/2020', pago: true},
    { tipo: 'Cartão de crédito', valor: 550.23, vencimento: '15/05/2020', pago: false}
]

server.get('/boleto', function(request, response) {
    response.json(boletos);
})

server.post('/boleto', function(request, response) {

    // const nome = request.body.nome;
    // const quantidade = request.body.quantidade;

    const {tipo, valor, vencimento, pago} = request.body;

    boletos.push({tipo, valor, vencimento, pago});
    response.status(204).send();
})

server.put('/boleto/:id', function(request, response) { 
    const id = request.params.id;
    const {tipo, valor, vencimento, pago} = request.body;

    for(let i = 0; i < boletos.length; i++) {
        if(boletos[i].tipo == id) {
            boletos[i].tipo = tipo;
            boletos[i].valor = valor;
            boletos[i].vencimento = vencimento;
            boletos[i].pago = pago;
            break;
        }
    }

    return response.status(204).send();
})

server.delete('/boleto/:id', function(request, response) {

    const id = request.params.id;

    for(let i = 0; i < boletos.length; i++) {
        if(boletos[i].tipo == id) {
            boletos.splice(i, 1);
            break;
        }
    }

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);
