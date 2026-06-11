# 🌸 Floresça — Como publicar no seu domínio

Este projeto está pronto para ir ao ar. Siga na ordem.

## 1. Testar no seu computador (opcional, mas recomendado)

1. Instale o Node.js (versão LTS): https://nodejs.org
2. Abra o terminal dentro desta pasta e rode:

   npm install
   npm run dev

3. Abra http://localhost:5173 no navegador.

Observação: rodando localmente assim, o resultado do Mapa usará o texto
padrão (fallback), porque a função de IA só existe no servidor da Vercel.
O resto do app funciona 100%.

## 2. Criar a chave da IA (Anthropic)

1. Crie uma conta em https://console.anthropic.com
2. Adicione créditos (é pré-pago, paga-se por uso).
3. Em "API Keys", crie uma chave e copie. Guarde em local seguro.
   NUNCA cole essa chave em nenhum arquivo do site.

## 3. Publicar na Vercel (hospedagem gratuita)

Jeito mais simples, sem terminal:

1. Crie uma conta em https://github.com e suba esta pasta como um
   repositório (pode usar o GitHub Desktop ou o upload pelo site).
2. Crie uma conta em https://vercel.com entrando com o GitHub.
3. Clique em "Add New → Project" e importe o repositório.
   A Vercel detecta o Vite sozinha — não mude nada.
4. ANTES de clicar em Deploy, abra "Environment Variables" e adicione:
   - Name:  ANTHROPIC_API_KEY
   - Value: (cole a chave do passo 2)
5. Clique em Deploy. Em ~1 minuto o site estará no ar em um endereço
   tipo floresca.vercel.app — teste tudo, inclusive o Mapa com IA.

## 4. Conectar o seu domínio

1. Na Vercel, abra o projeto → Settings → Domains → adicione
   seudominio.com.br (e também www.seudominio.com.br).
2. A Vercel vai mostrar exatamente quais registros DNS criar.
   Em geral são dois:
   - Registro A    | nome: @   | valor: o IP que a Vercel mostrar
   - Registro CNAME| nome: www | valor: o endereço que a Vercel mostrar
3. Vá no painel onde o domínio está registrado (Registro.br, GoDaddy,
   Hostinger etc.), entre na edição de DNS e crie esses registros.
4. Aguarde a propagação (de minutos até algumas horas). A Vercel
   ativa o cadeado HTTPS automaticamente, sem custo.

## 5. Atualizações futuras

Editou o código? Basta enviar a mudança para o GitHub (commit + push)
que a Vercel publica a nova versão sozinha.

## Estrutura do projeto

- src/App.jsx     → todo o aplicativo
- api/claude.js   → função no servidor que chama a IA com a chave secreta
- index.html      → título e descrição do site (bom para o Google)
