export default async function handler(req, res) {
  const { prompt } = req.body;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Du bist ein freundlicher digitaler Assistent für Menschen in Österreich. Hilf bei Steuerausgleich, Familienbonus, Förderungen und Versicherungen. Sprich einfach, höflich und gib Beispiele." },
        { role: "user", content: prompt }
      ]
    })
  });
  const data = await response.json();
  res.status(200).json(data);
}
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User message received:", userMessage); // ✅ Log

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Du bist ein hilfreicher Finanzberater für österreichische Förderungen.' },
          { role: 'user', content: userMessage }
        ],
      }),
    });

    const data = await response.json();

    console.log("OpenAI API response:", data); // ✅ Log

    if (response.ok) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: data });
    }
  } catch (error) {
    console.error("API Error:", error); // ✅ Log
    res.status(500).json({ error: 'Interner Fehler' });
  }
};
