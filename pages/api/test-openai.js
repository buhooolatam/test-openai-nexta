// pages/api/test-openai.js

const { Configuration, OpenAIApi } = require('openai');

module.exports = async function handler(req, res) {
  try {
    console.log('Probando OpenAI con module.exports...');

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(config);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Hola mundo',
      max_tokens: 5,
    });

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error('Error en test-openai:', err);
    return res.status(500).json({ error: err.message });
  }
};
