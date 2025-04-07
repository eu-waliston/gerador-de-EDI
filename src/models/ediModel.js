exports.generateEDIText = (data) => {
    const { tipoNota, numeroNota, dataNota, destinatario, itens } = data;
    const codigoTipo = tipoNota === 'venda' ? '5400' : '5700';
    const empresa = {
      nome: '',
      endereco: '',
      cidade: '',
      telefone: '',
      cnpj: ''
    };
  
    let edi = `ST*850*${codigoTipo}\n`;
    edi += `BG*${numeroNota}*${dataNota}\n`;
    edi += `N1*${empresa.nome}*${empresa.endereco}*${empresa.cidade}*${empresa.telefone}*${empresa.cnpj}\n`;
    edi += `N2*${destinatario.nome}*${destinatario.endereco}*${destinatario.cidade}*${destinatario.telefone}*${destinatario.cpfCnpj}\n`;
  
    let totalItens = 0;
    let totalValor = 0;
  
    JSON.parse(itens).forEach((item, index) => {
      const total = item.quantidade * item.valorUnitario;
      totalItens += parseInt(item.quantidade);
      totalValor += total;
      edi += `PO${index + 1}*${item.quantidade}*${item.descricao}*${parseFloat(item.valorUnitario).toFixed(2)}*${total.toFixed(2)}\n`;
    });
  
    edi += `CTT*${totalItens}*${totalValor.toFixed(2)}\n`;
    edi += `SE*${numeroNota}\n`;
  
    return edi;
  };
  