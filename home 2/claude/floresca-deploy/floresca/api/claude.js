// Função serverless (roda no servidor da Vercel, não no navegador).
// Ela repassa o pedido do site para a API da Anthropic adicionando a sua
// chave secreta, que fica guardada na variável de ambiente ANTHROPIC_API_KEY.
// Assim a chave NUNCA aparece no código do site.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY não configurada na Vercel" });
    return;
  }

  try {
    const resposta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: req.body && req.body.messages ? req.body.messages : []
      })
    });

    const data = await resposta.json();
    res.status(resposta.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "Erro ao chamar a IA" });
  }
}
