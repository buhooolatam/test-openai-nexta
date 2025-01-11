export default async function handler(req, res) {
  try {
    console.log('Probando OpenAI con fetch sin SDK...');

    // Construyes el body que normalmente mandarías al SDK
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Hola mundo",
        max_tokens: 5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Error en test-openai con fetch:', err);
    return res.status(500).json({ error: err.message });
  }
}
