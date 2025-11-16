const fetch = require('node-fetch');

// Headers CORS para permitir requisições do navegador
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
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
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Não consegui salvar. Erro do servidor ActivePieces.' })
      };
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Ficha salva com sucesso!' })
    };
  } catch (error) {
    console.error('Erro na função enviar.js:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Não foi possível processar seu pedido de gravação. Salve os dados em PDF. Erro: ' + error.message })
    };
  }
};