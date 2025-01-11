// pages/api/test-openai.js

export default async function handler(req, res) {
  try {
    console.log('Probando OpenAI con fetch (Chat Completions)...');

    // Llamamos a la API de OpenAI sin usar el SDK.
    // Asegúrate de tener la variable OPENAI_API_KEY en Vercel (Project Settings → Environment Variables).
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "Hola mundo", // Ajusta el contenido según tu caso
          },
        ],
        max_tokens: 50, // Ajusta según lo que requieras
      }),
    });

    // Manejo de error si la API de OpenAI devuelve un estatus distinto de 2xx
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenAI API respondió con estado ${response.status}: ${errorText}`
      );
    }

    // Si llega aquí, todo fue bien
    const data = await response.json();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    // Capturamos y mostramos el error
    console.error('Error en test-openai:', err);
    return res.status(500).json({ error: err.message });
  }
}
