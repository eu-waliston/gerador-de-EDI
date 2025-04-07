const fs = require('fs');
const path = require('path');

function generateEDI(req, res) {
    const {
        tipoNota,
        numeroNota,
        data,
        nomeDestinatario,
        enderecoDestinatario,
        cidadeDestinatario,
        telefoneDestinatario,
        documentoDestinatario,
        itens
    } = req.body;

    // Transforma os itens (vindo do form ou mockado) em JSON, se necessário
    const parsedItens = JSON.parse(itens);

    const tipoCodigo = tipoNota === 'venda' ? 'venda' : 'compra';
    const linha1 = `Codigo: ${tipoCodigo}`;
    const linha2 = `Numero da nota: ${numeroNota}*${data}`;
    const linha3 = `--------------------------------------------------`;
    const linha4 = `Destinatário: `;
    const linha5 = `Nome: ${nomeDestinatario}`;
    const linha6 = `Endereço: ${enderecoDestinatario}`;
    const linha7 = `Cidade: ${cidadeDestinatario}`;
    const linha8 = `Telefo: ${telefoneDestinatario}`;
    const linha9 = `CPF/CNPJ: ${documentoDestinatario}`;

    let linhasPO = [];
    let totalItens = 0;
    let totalNota = 0;

    parsedItens.forEach((item, index) => {
        const total = item.quantidade * item.valorUnitario;
        totalItens += item.quantidade;
        totalNota += total;

        linhasPO.push(`PO${index + 1}*${item.quantidade}*${item.descricao}*${item.valorUnitario.toFixed(2)}*${total.toFixed(2)}`);
    });

    const linhaCTT = `CTT*${totalItens}*${totalNota.toFixed(2)}`;
    const linhaSE = `SE*${numeroNota}`;

    const edi = [
        linha1,
        linha2,
        linha3,
        linha4,
        linha5,
        linha6,
        linha7,
        linha8,
        linha9,
        // ...linhasPO,
        // linhaCTT,
        // linhaSE
    ].join('\n');

    // Enviando o conteúdo para a view
    res.render('success', { edi });
}

module.exports = {
    generateEDI
};
