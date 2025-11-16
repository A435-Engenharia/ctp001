const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  try {
    const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/PYolUaDZ0aNZ0KKEF1WFg/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': 'Agencia435'
      },
      body: event.body
    });

    if (!response.ok) {
      throw new Error('Não consegui salvar. Parece que há uma problema na comunicação com o servidor. Exporte para PDF e tente mais tarde.');
    }

    return { statusCode: 200, body: 'Ficha salva com sucesso!' };
  } catch (error) {
    return { statusCode: 500, body: 'Não foi possível processar seu pedido de gravação. Salve os dados em PDF. Erro: ' + error.message };
  }
};