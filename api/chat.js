const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const userMessage = req.body?.message;

    console.log("User message received:", userMessage);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Du bist ein hilfreicher Finanzberater für Menschen in Österreich und erklärst, wie man Förderungen, Beihilfen und den Steuerausgleich bekommt.',
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("OpenAI API raw response:", data);

    if (!response.ok || !data.choices) {
      console.error("OpenAI returned error:", data);
      return res.status(500).json({ error: "Antwort vom OpenAI fehlgeschlagen." });
    }

    const reply = data.choices[0].message.content;

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: 'Serverfehler bei Anfrage' });
  }
};
