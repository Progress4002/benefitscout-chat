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
