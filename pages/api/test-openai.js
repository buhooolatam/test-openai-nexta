export default async function handler(req, res) {
  try {
    console.log('Probando SOLO OpenAI en proyecto minimal...');

    const { Configuration, OpenAIApi } = require('openai');
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // <- Tendrás que poner esta variable en Vercel
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
    console.error('Error en test-openai minimal:', err);
    return res.status(500).json({ error: err.message });
  }
}
