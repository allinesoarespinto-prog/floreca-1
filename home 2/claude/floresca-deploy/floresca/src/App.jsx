import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

const rose = "#C17A8E";
const deep = "#5E2A45";
const gold = "#C9A46A";
const pale = "#FBF0F4";
const gR = "linear-gradient(135deg,#C17A8E,#5E2A45)";
const gG = "linear-gradient(135deg,#C9A46A,#A87A3A)";
const sh = "0 4px 16px rgba(94,42,69,.12)";

function S(bg, x) {
  return Object.assign({ border:"none", borderRadius:50, padding:"14px 24px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"sans-serif", background:bg, color:"#fff", width:"100%" }, x || {});
}

const FB = {
  nome: "A Transformadora de Histórias",
  nicho: "Você usa sua sensibilidade para transformar vidas — inclusive a sua",
  analise1: "Ao ler suas respostas, o que me chamou atenção foi a consistência entre o que você ama, no que é boa e a causa que te move. Não é coincidência — é propósito.",
  analise2: "O fio condutor oculto é este: você tem uma habilidade natural de ver o que os outros não veem em si mesmos, e um dom para criar coisas que tocam emocionalmente.",
  analise3: "Você combina sensibilidade emocional com entrega prática. As pessoas não compram produtos — compram como querem se sentir. E você entrega isso naturalmente.",
  analise4: "O que você deve fazer é nomear quem quer ajudar, definir qual transformação entrega, e oferecer isso para as primeiras 3 pessoas ainda hoje.",
  forca: "Sua capacidade de transformar o que sente em algo que outras pessoas precisam.",
  sn: "Mentoria de Descoberta de Propósito para Mães",
  sp: "Mães entre 28 e 42 anos que perderam a conexão com quem são depois da maternidade",
  sd: "Sessões individuais de 1 hora online onde você ajuda a mulher a descobrir seu talento e como monetizá-lo.",
  sv: "R$150 por sessão — comece com 3 sessões piloto gratuitas",
  ss: "Abra o WhatsApp agora. Mande mensagem para 3 amigas oferecendo uma sessão gratuita de descoberta de propósito. Marque a primeira conversa.",
  sr: "R$3k a R$8k/mês com 5 a 8 clientes",
  pn: "Guia Digital: Descubra Seu Talento em 7 Dias",
  pp: "Mulheres que querem se encontrar mas não sabem por onde começar",
  pd: "PDF de 20 páginas com exercícios guiados e perguntas reflexivas. Criado uma vez, vendido infinitas vezes.",
  pv: "R$47",
  ps: "Abra o Google Docs agora. Escreva 10 perguntas que você faria para uma amiga que está perdida. Esse é o rascunho do seu produto.",
  pr: "R$1.5k a R$4k/mês",
  missao: "Ajudar mulheres a se reconectarem com quem elas são para que possam viver com propósito real.",
  mensagem: "Você chegou até aqui respondendo perguntas difíceis sobre si mesma. Isso já diz muito sobre quem você é. Há uma força em você que ainda não aprendeu a nomear. Está na hora de acreditar no que sempre esteve ali."
};

const ETAPAS = [
  { ic:"🌟", q:"Vamos começar pela sua história", sub:"Sua trajetória revela muito sobre seus talentos",
    tp:"Quais foram os momentos mais felizes da sua vida? O que você fazia? Quando criança, o que amava fazer por horas? Existe algum tema que sempre esteve presente na sua vida?",
    opts:[["👶","Sempre criei desde pequena"],["📚","Sempre fui estudiosa"],["🤝","Sempre gostei de ajudar"],["🏠","Cuidar do lar me realiza"],["🎨","Arte sempre me atraiu"],["💪","Superei muitos desafios"],["🌱","Fui descobrindo meus talentos aos poucos"],["❤️","A maternidade me transformou"],["🚀","Sempre tive espírito empreendedor"],["🌍","Sempre quis causar impacto"]] },
  { ic:"💕", q:"O que faz seu coração bater mais forte?", sub:"Escreva com suas palavras primeiro, depois selecione",
    tp:"O que você faria mesmo sem receber dinheiro? O que te dá energia e faz perder a noção do tempo? Se tivesse total liberdade financeira, como ocuparia seus dias?",
    opts:[["🍳","Cozinhar e criar receitas"],["🍰","Confeitaria e doces"],["🧶","Artesanato e crochê"],["📸","Fotografar momentos"],["✍️","Escrever e criar textos"],["🛋️","Decorar e organizar"],["🧵","Costurar e customizar"],["🌱","Cuidar de plantas"],["🎵","Música e canto"],["💃","Dançar"],["📚","Ensinar e explicar"],["🖌️","Pintar e criar arte"],["💄","Maquiagem e beleza"],["📱","Criar conteúdo digital"],["🐾","Cuidar de animais"],["🕯️","Velas e aromaterapia"],["🧁","Padaria e pães"],["🧴","Skincare e autocuidado"]] },
  { ic:"⭐", q:"No que você é naturalmente boa?", sub:"Escreva com suas palavras primeiro, depois selecione",
    tp:"O que você faz com facilidade que outras acham difícil? Em que as pessoas pedem sua ajuda? Quais conquistas te deixam orgulhosa?",
    opts:[["🗂️","Organizar tudo muito bem"],["👩‍🍳","Cozinho muito bem"],["🎨","Tenho olho para estética"],["💬","Me comunico muito bem"],["👩‍🏫","Sei ensinar e explicar"],["🧶","Trabalhos manuais com qualidade"],["💻","Me viro bem com tecnologia"],["💰","Facilidade em vender"],["🌟","As pessoas confiam em mim"],["👂","Sou boa ouvinte"],["📋","Planejo e executo bem"],["✨","Crio conteúdo que engaja"],["💡","Sempre tenho ideias criativas"],["🌈","Animo e motivo pessoas"]] },
  { ic:"🌍", q:"O que você sente vontade de mudar no mundo?", sub:"Escreva com suas palavras primeiro, depois selecione",
    tp:"Quais problemas mais te incomodam? Que transformação quer promover? Quem você entende profundamente e sente vontade de ajudar?",
    opts:[["🥗","Alimentação saudável e acessível"],["💪","Autoestima e empoderamento feminino"],["💸","Mulheres que precisam de renda"],["👶","Educação infantil"],["🏠","Lares mais organizados"],["🐾","Bem-estar animal"],["🧠","Saúde mental e bem-estar"],["💄","Beleza acessível para todas"],["💰","Organização financeira familiar"],["🎨","Arte ao alcance de todos"],["🌱","Consumo consciente"],["👩‍👧","Conexão entre mães"],["🚀","Empreendedorismo feminino"]] },
  { ic:"💰", q:"Pelo que você pode ser valorizada e paga?", sub:"Escreva com suas palavras primeiro, depois selecione",
    tp:"Quais conhecimentos seus geram valor? O que as pessoas pagariam para aprender com você? Quais experiências poderiam virar método ou produto?",
    opts:[["🛍️","Vender produtos que faço"],["📚","Dar aulas ou workshops"],["🤝","Consultoria e mentoria"],["📱","Criar conteúdo para marcas"],["⭐","Prestar serviços"],["💻","Vender produtos digitais"],["🏷️","Revender produtos que amo"],["🎉","Trabalhar em eventos"],["🌟","Parcerias com marcas"],["📖","Escrever livros ou artigos"],["🏡","Decoração e organização"],["🌐","Marketing digital"]] },
  { ic:"💎", q:"Quais são seus valores inegociáveis?", sub:"Escreva com suas palavras primeiro, depois selecione",
    tp:"Quais valores mais importantes da sua vida? O que jamais abriria mão? Como deseja ser lembrada? O que significa sucesso, liberdade e felicidade para você?",
    opts:[["👨‍👩‍👧","Família em primeiro lugar"],["🕊️","Liberdade e autonomia"],["💡","Criatividade e inovação"],["🤝","Impacto e contribuição"],["💰","Segurança financeira"],["❤️","Amor e conexões reais"],["🌱","Crescimento contínuo"],["🎯","Propósito e significado"],["⚖️","Equilibrio vida e trabalho"],["✨","Autenticidade e verdade"],["🙏","Espiritualidade e fé"],["🌍","Deixar um legado"]] }
];

const MODS = [
  { t:"Mapa do Florescimento", dur:"45 min", free:true, ic:"🗺️", cat:"Início" },
  { t:"Ponto de Equilíbrio", dur:"60 min", free:false, ic:"⚖️", cat:"Negócios" },
  { t:"Como precificar seu talento", dur:"55 min", free:false, ic:"💰", cat:"Negócios" },
  { t:"Seu primeiro cliente", dur:"40 min", free:true, ic:"🎯", cat:"Marketing" },
  { t:"Instagram que vende", dur:"50 min", free:false, ic:"📱", cat:"Marketing" },
  { t:"Guia das Paixoes Remuneradas", dur:"PDF", free:true, ic:"💡", cat:"Ferramentas" },
  { t:"Mentalidade de Empreendedora", dur:"65 min", free:false, ic:"🧠", cat:"Mindset" }
];

const PAIXOES = [
  { id:"c1", nome:"Confeitaria & Doces", emoji:"🍰", cat:"Gastronomia", desc:"Transformar ingredientes em obras de arte comestíveis tem altíssima demanda no Brasil.", monetizar:["Encomendas de bolos e doces","Curso online de confeitaria","Mesa de doces para eventos","Canal de receitas no YouTube"], renda:"R$1.5k a R$12k/mês", tempo:"1 a 3 meses", passo:"Faça 3 receitas que ama, fotografe com boa luz e publique. Ofereça 2 encomendas teste para amigas.", instagrams:[] },
  { id:"c2", nome:"Artesanato & Crochê", emoji:"🧶", cat:"Criativo", desc:"Peças únicas feitas à mão têm valor emocional e comercial altíssimo no mercado digital.", monetizar:["Venda no Elo7, Instagram e Shopee","Kits presenteáveis personalizados","Workshops online","Venda de moldes digitais"], renda:"R$800 a R$6k/mês", tempo:"2 a 4 semanas", passo:"Crie 5 peças com sua técnica favorita, fotografe e abra um perfil exclusivo.", instagrams:[] },
  { id:"c3", nome:"Fotografia", emoji:"📸", cat:"Arte & Visual", desc:"O olhar sensível para capturar momentos pode se tornar uma carreira poderosa.", monetizar:["Ensaios de família e newborn","Fotografia de eventos","Banco de imagens","Curso para iniciantes"], renda:"R$2k a R$15k/mês", tempo:"1 a 2 meses", passo:"Faça 10 ensaios grátis para amigas com celular. Monte portfólio no Instagram.", instagrams:[] },
  { id:"c4", nome:"Escrita & Copywriting", emoji:"✍️", cat:"Comunicação", desc:"Quem sabe escrever tem uma das habilidades mais valiosas do mundo digital.", monetizar:["Redação para sites e blogs","Copy para redes sociais","E-mails de vendas","Ghostwriting"], renda:"R$1.5k a R$10k/mês", tempo:"2 a 6 semanas", passo:"Escreva 3 posts sobre um assunto que domina. O que mais ressoa é seu nicho.", instagrams:[] },
  { id:"c5", nome:"Decoração & Interiores", emoji:"🛋️", cat:"Lar & Arte", desc:"Criar ambientes bonitos e funcionais pode se tornar uma carreira poderosa.", monetizar:["Consultoria de decoração online","Projetos de design de interiores","Curadoria de produtos","Curso de decoração"], renda:"R$2k a R$12k/mês", tempo:"1 a 3 meses", passo:"Decore um cômodo da sua casa, fotografe e publique como antes e depois.", instagrams:[] },
  { id:"c6", nome:"Maquiagem & Beleza", emoji:"💄", cat:"Beleza", desc:"O mercado de beleza brasileiro é o 4º maior do mundo.", monetizar:["Makes para noivas e festas","Make artístico para ensaios","Curso de automaquiagem","Tutoriais no YouTube"], renda:"R$1.5k a R$9k/mês", tempo:"1 a 2 meses", passo:"Faça a make de 3 amigas gratuitamente. Fotografe e publique como portfólio.", instagrams:[] },
  { id:"c7", nome:"Culinária & Marmitas", emoji:"🍳", cat:"Gastronomia", desc:"Marmitas fitness e comida congelada têm demanda crescente em todo o Brasil.", monetizar:["Marmitas fitness e saudáveis","Pratos congelados artesanais","Quentinha para empresas","E-book de receitas"], renda:"R$1k a R$7k/mês", tempo:"1 a 2 semanas", passo:"Monte um cardápio semanal e ofereça para 5 pessoas na vizinhança.", instagrams:[] },
  { id:"c8", nome:"Design Gráfico & Canva", emoji:"🎨", cat:"Digital", desc:"Com Canva e ferramentas digitais, designers criam materiais para marcas sem sair de casa.", monetizar:["Identidade visual e logotipos","Arte para redes sociais","Curso de Canva","Templates para venda"], renda:"R$1.5k a R$8k/mês", tempo:"2 a 6 semanas", passo:"Crie 3 templates no Canva e ofereça 1 post grátis para uma marca local.", instagrams:[] },
  { id:"c9", nome:"Yoga & Bem-estar", emoji:"🧘‍♀️", cat:"Saúde", desc:"O mercado de bem-estar é bilionário e cresce 10% ao ano.", monetizar:["Aulas presenciais e online","Programa digital de bem-estar","Podcast de meditação","Retiros imersivos"], renda:"R$1.5k a R$8k/mês", tempo:"1 a 3 meses", passo:"Compartilhe uma meditação guiada de 5 min no Instagram.", instagrams:[] },
  { id:"c10", nome:"Marketing Digital", emoji:"📊", cat:"Digital", desc:"Toda empresa precisa de presença digital. Gestoras de tráfego são muito demandadas.", monetizar:["Gestão de redes sociais","Gestão de tráfego pago","E-mail marketing","Consultorias"], renda:"R$2k a R$15k/mês", tempo:"1 a 3 meses", passo:"Faça o curso gratuito do Google (Ateliê Digital) e aplique no seu perfil.", instagrams:[] },
  { id:"c11", nome:"Velas & Aromaterapia", emoji:"🕯️", cat:"Criativo", desc:"Velas artesanais têm demanda altíssima para presentes e decoração.", monetizar:["Velas artesanais personalizadas","Kits presenteáveis","Workshop de fabricação","Kits de aromaterapia"], renda:"R$800 a R$5k/mês", tempo:"2 a 4 semanas", passo:"Faça suas primeiras velas, fotografe em cenário bonito e abra lojinha no Elo7.", instagrams:[] },
  { id:"c12", nome:"Jardinagem & Plantas", emoji:"🌱", cat:"Natureza", desc:"O universo das plantas explodiu. Paisagismo e kokedamas têm mercado crescente.", monetizar:["Venda de mudas e arranjos","Paisagismo residencial","Workshop de plantas","Kits presenteáveis"], renda:"R$800 a R$5k/mês", tempo:"2 a 8 semanas", passo:"Multiplique suas plantas, fotografe e crie um Instagram para sua coleção.", instagrams:[] }
];

function Nav({ page, go }) {
  return (
    <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"#fff", borderTop:"1px solid #F0D0DC", display:"flex", zIndex:99, boxSizing:"border-box" }}>
      {[["🏠","Início","home"],["🗺️","Mapa","mapa"],["💡","Paixões","guia"],["🎓","Academia","academy"]].map(function(x) {
        return (
          <div key={x[1]} onClick={function(){ go(x[2]); }} style={{ flex:1, padding:"10px 0", textAlign:"center", cursor:"pointer" }}>
            <div style={{ fontSize:22 }}>{x[0]}</div>
            <div style={{ fontSize:10, fontWeight:700, color:page===x[2]?rose:"#B8A0B0" }}>{x[1]}</div>
          </div>
        );
      })}
    </div>
  );
}

function Mapa({ onFinalizar, onVoltar }) {
  var [etapa, setEtapa] = useState(0);
  var [sels, setSels] = useState([[],[],[],[],[],[]]);
  var [txts, setTxts] = useState(["","","","","",""]);
  var e = ETAPAS[etapa];
  var sel = sels[etapa];
  var MAX = 5;

  function setTxt(v) { setTxts(function(p){ return p.map(function(x,i){ return i===etapa?v:x; }); }); }

  function toggle(o) {
    setSels(function(p) {
      var n = p.map(function(x){ return x.slice(); });
      if (sel.includes(o)) n[etapa] = sel.filter(function(x){ return x!==o; });
      else if (sel.length < MAX) n[etapa] = sel.concat([o]);
      return n;
    });
  }

  function avancar() {
    if (etapa < ETAPAS.length - 1) setEtapa(function(e){ return e+1; });
    else onFinalizar(sels, txts);
  }

  var temSel = sel.length > 0 || txts[etapa].trim().length > 0;

  return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:100 }}>
      <div style={{ background:gR, padding:"56px 22px 28px" }}>
        <div style={{ display:"flex", gap:5, marginBottom:16 }}>
          {ETAPAS.map(function(_, i){ return <div key={i} style={{ flex:1, height:4, borderRadius:4, background:i<=etapa?"rgba(255,255,255,.9)":"rgba(255,255,255,.25)" }}/>; })}
        </div>
        <div style={{ color:"rgba(255,255,255,.7)", fontSize:11, letterSpacing:2, textTransform:"uppercase" }}>Etapa {etapa+1} de {ETAPAS.length}</div>
        <div style={{ fontSize:34, margin:"8px 0" }}>{e.ic}</div>
        <h2 style={{ color:"#fff", fontSize:19, margin:"0 0 6px", fontWeight:900, lineHeight:1.3 }}>{e.q}</h2>
        <p style={{ color:"rgba(255,255,255,.75)", fontSize:13, margin:0 }}>{e.sub}</p>
      </div>

      <div style={{ padding:"18px 16px" }}>
        <div style={{ background:"#fff", borderRadius:16, padding:18, marginBottom:16, boxShadow:sh }}>
          <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Escreva com suas próprias palavras</div>
          <p style={{ color:"#7A5070", fontSize:13, lineHeight:1.7, margin:"0 0 10px" }}>{e.tp}</p>
          <textarea value={txts[etapa]} onChange={function(ev){ setTxt(ev.target.value); }} placeholder="Quanto mais você compartilhar, mais personalizado será seu resultado..." style={{ width:"100%", padding:"12px 14px", borderRadius:12, border:"1.5px solid "+rose, fontSize:14, fontFamily:"sans-serif", color:"#3D2133", resize:"none", height:100, boxSizing:"border-box", outline:"none", lineHeight:1.6 }}/>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <div style={{ flex:1, height:1, background:"#ECDDE5" }}/>
          <span style={{ fontSize:12, color:"#B8A0B0", fontWeight:600, whiteSpace:"nowrap" }}>Ou selecione (até {MAX})</span>
          <div style={{ flex:1, height:1, background:"#ECDDE5" }}/>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
          {e.opts.map(function(o) {
            var on = sel.includes(o[1]);
            var bloq = !on && sel.length >= MAX;
            return (
              <div key={o[1]} onClick={function(){ toggle(o[1]); }} style={{ background:on?rose:"#fff", borderRadius:13, padding:"12px 10px", cursor:bloq?"not-allowed":"pointer", boxShadow:sh, border:"2px solid "+(on?rose:"transparent"), textAlign:"center", opacity:bloq?0.4:1 }}>
                <div style={{ fontSize:22, marginBottom:4 }}>{o[0]}</div>
                <div style={{ fontSize:11, fontWeight:on?700:600, color:on?"#fff":"#3D2133", lineHeight:1.4 }}>{o[1]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:"#fff", padding:"14px 20px", boxShadow:"0 -4px 16px rgba(0,0,0,.08)", boxSizing:"border-box" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          {etapa > 0
            ? <button onClick={function(){ setEtapa(function(e){ return e-1; }); }} style={S(pale, { color:deep, width:"auto", padding:"10px 18px", fontSize:13 })}>← Voltar</button>
            : <button onClick={onVoltar} style={S(pale, { color:deep, width:"auto", padding:"10px 18px", fontSize:13 })}>← Sair</button>}
          <button onClick={avancar} disabled={!temSel} style={S(gR, { width:"auto", padding:"10px 22px", fontSize:13, opacity:temSel?1:0.4 })}>
            {etapa < ETAPAS.length - 1 ? "Próxima →" : "🌸 Ver meu Mapa"}
          </button>
        </div>
        <div style={{ textAlign:"center", marginTop:8, fontSize:12, color:"#7A5070" }}>
          {txts[etapa].trim() ? "Texto preenchido ✓" : ""}{txts[etapa].trim() && sel.length > 0 ? " · " : ""}{sel.length > 0 ? sel.length + " selecionada" + (sel.length > 1 ? "s" : "") : ""}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var [page, setPage] = useState("land");
  var [tab, setTab] = useState("login");
  var [mods, setMods] = useState(MODS);
  var [result, setResult] = useState(null);
  var [webhook, setWebhook] = useState(function(){ try { return localStorage.getItem("fl_wh") || ""; } catch(e) { return ""; } });
  var [tapCount, setTapCount] = useState(0);
  var [tapTimer, setTapTimer] = useState(null);
  var [paixoes, setPaixoes] = useState(function(){ try { var s = localStorage.getItem("fl_px"); return s ? JSON.parse(s) : PAIXOES; } catch(e) { return PAIXOES; } });
  var [paixaoAtual, setPaixaoAtual] = useState(null);
  var [guiaCat, setGuiaCat] = useState("Todas");
  var [editInstaId, setEditInstaId] = useState(null);
  var [editInstaVal, setEditInstaVal] = useState("");
  var [showNewP, setShowNewP] = useState(false);
  var [newP, setNewP] = useState({ emoji:"🌸", nome:"", cat:"", desc:"", mon:"", renda:"", tempo:"", passo:"", insta:"" });
  var [paidEmails, setPaidEmails] = useState(function(){ try { var s = localStorage.getItem("fl_paid"); return s ? JSON.parse(s) : []; } catch(e) { return []; } });
  var [newEmail, setNewEmail] = useState("");
  var [zap, setZap] = useState(function(){ try { return localStorage.getItem("fl_zap") || "5514996583718"; } catch(e) { return "5514996583718"; } });
  var [hero, setHero] = useState(function(){ try { return localStorage.getItem("fl_hero") || "Encontre seu talento, transforme-o em renda e construa uma vida com mais liberdade, tempo e realização."; } catch(e) { return "Encontre seu talento, transforme-o em renda e construa uma vida com mais liberdade, tempo e realização."; } });
  var [stats, setStats] = useState(function(){ try { var s = localStorage.getItem("fl_stats"); return s ? JSON.parse(s) : [["2.400+","Mulheres"],["4.9★","Avaliação"],["87%","Monetizaram"]]; } catch(e) { return [["2.400+","Mulheres"],["4.9★","Avaliação"],["87%","Monetizaram"]]; } });

  function setStat(i, j, v) {
    setStats(function(p) {
      var n = p.map(function(x){ return x.slice(); });
      n[i][j] = v;
      try { localStorage.setItem("fl_stats", JSON.stringify(n)); } catch(e) {}
      return n;
    });
  }

  useEffect(function() { try { localStorage.setItem("fl_paid", JSON.stringify(paidEmails)); } catch(e) {} }, [paidEmails]);

  useEffect(function() {
    if (result !== null && page === "loading") setPage("result");
  }, [result]);

  function go(p) { setPage(p); window.scrollTo(0, 0); }

  function tap() {
    if (tapTimer) clearTimeout(tapTimer);
    var n = tapCount + 1;
    if (n >= 7) { setTapCount(0); go("adm"); }
    else { setTapCount(n); var t = setTimeout(function(){ setTapCount(0); }, 2000); setTapTimer(t); }
  }

  function enviarLead(nome, email) {
    var url = webhook || localStorage.getItem("fl_wh");
    if (!url) return;
    try { fetch(url, { method:"POST", body:JSON.stringify({ nome:nome, email:email, origem:"Floresça" }) }); } catch(e) {}
  }

  function gerarResultado(sels, txts) {
    setResult(null);
    go("loading");
    var d = function(i) { return (txts[i] || "") + (sels[i] && sels[i].length ? " | " + sels[i].join(", ") : ""); };
    var prompt = [
      "Você é mentora especialista em talentos femininos. Analise as respostas e responda APENAS o JSON pedido.",
      "HISTÓRIA: " + d(0),
      "AMA: " + d(1),
      "BOA EM: " + d(2),
      "MISSAO: " + d(3),
      "MONETIZACAO: " + d(4),
      "VALORES: " + d(5),
      "REGRAS: cite palavras exatas do texto. Nicho específico. Primeiro passo para hoje sem gastar nada.",
      "Responda APENAS este JSON sem texto antes ou depois:",
      '{"nome":"nome unico","nicho":"nicho especifico","analise1":"o que as respostas revelam","analise2":"fio condutor oculto","analise3":"diferencial de mercado","analise4":"o que ela deve fazer","forca":"talento que ela subestima","sn":"nome do servico com nicho","sp":"para quem","sd":"como funciona","sv":"valor sugerido","ss":"acao para hoje","sr":"potencial 90 dias","pn":"nome do produto com nicho","pp":"para quem","pd":"o que e","pv":"valor sugerido","ps":"acao para hoje","pr":"potencial 90 dias","missao":"missao em 1 frase","mensagem":"mensagem pessoal e poderosa"}'
    ].join("\n");

    fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages:[{ role:"user", content:prompt }] })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var txt = "";
      if (data && data.content) {
        txt = data.content.map(function(c) { return c.text || ""; }).join("").trim();
      }
      var s = txt.indexOf("{");
      var e = txt.lastIndexOf("}");
      if (s >= 0 && e > s) {
        try {
          var parsed = JSON.parse(txt.slice(s, e + 1));
          if (parsed && parsed.nome) { setResult(parsed); return; }
        } catch(ex) {}
      }
      setResult(FB);
    })
    .catch(function() { setResult(FB); });
  }

  function salvarPDF() {
    var elemento = document.getElementById('resultado-mapa');
    var opt = {
      margin:       0.5,
      filename:     'meu-mapa-floresca.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(elemento).save();
  }

  if (page === "land") return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif" }}>
      <div style={{ background:gR, padding:"60px 24px 48px", textAlign:"center" }}>
        <div style={{ fontSize:52 }}>🌸</div>
        <p style={{ color:"rgba(255,255,255,.7)", fontSize:11, letterSpacing:3, textTransform:"uppercase", margin:"8px 0" }}>Floresça</p>
        <h1 style={{ color:"#fff", fontSize:25, lineHeight:1.3, margin:"0 0 14px", fontWeight:900 }}>{hero}</h1>
        <p style={{ color:"rgba(255,255,255,.9)", fontSize:14, lineHeight:1.8, margin:"0 0 6px", fontWeight:700 }}>Você não precisa começar do zero.</p>
        <p style={{ color:"rgba(255,255,255,.8)", fontSize:14, lineHeight:1.8, margin:"0 0 26px" }}>O Floresça ajuda você a descobrir seus talentos, enxergar oportunidades reais de renda e dar os primeiros passos para criar a vida que deseja viver — sem abrir mão da sua família, da sua essência ou dos seus sonhos.</p>
        <button onClick={function(){ go("auth"); }} style={S(gG, { fontSize:15, padding:"16px 28px", width:"auto" })}>🌸 Fazer meu Mapa do Florescimento</button>
        <p style={{ color:"rgba(255,255,255,.5)", fontSize:12, marginTop:10 }}>Gratuito • Resultado em 10 minutos • Sem cartão</p>
      </div>
      <div style={{ background:"#fff", display:"flex", justifyContent:"space-around", padding:16 }}>
        {stats.map(function(x, i){ return <div key={i} style={{ textAlign:"center" }}><div style={{ fontSize:17, fontWeight:900, color:deep }}>{x[0]}</div><div style={{ fontSize:11, color:"#7A5070" }}>{x[1]}</div></div>; })}
      </div>
      <div style={{ padding:"24px 18px" }}>
        {[["🗺️","Mapa do Florescimento","6 etapas profundas para descobrir onde sua paixão e renda se encontram."],["💡","Guia das Paixões Remuneradas","15+ paixões com guia completo de como gerar renda real."],["🤖","Resultado gerado por IA","Análise única com nicho específico, preço e primeiro passo para hoje."],["🚀","Mentoria Individual","Aceleração personalizada para transformar meses em semanas."]].map(function(x){ return (
          <div key={x[1]} style={{ display:"flex", gap:14, background:"#fff", borderRadius:14, padding:15, marginBottom:10, boxShadow:sh }}>
            <span style={{ fontSize:26 }}>{x[0]}</span>
            <div><div style={{ fontWeight:700, color:"#3D2133", fontSize:14, marginBottom:3 }}>{x[1]}</div><div style={{ color:"#7A5070", fontSize:13, lineHeight:1.6 }}>{x[2]}</div></div>
          </div>
        ); })}
      </div>
      <div style={{ padding:"24px 20px 48px", textAlign:"center" }}>
        <button onClick={function(){ go("auth"); }} style={S(gR)}>🌸 Começar agora — é grátis</button>
      </div>
      <div style={{ background:deep, padding:"16px", textAlign:"center" }}>
        <span onClick={tap} style={{ color:"rgba(255,255,255,.3)", fontSize:22, cursor:"default", userSelect:"none" }}>🌸</span>
        <div style={{ color:"rgba(255,255,255,.2)", fontSize:10, marginTop:4 }}>Floresça · Todos os direitos reservados</div>
      </div>
    </div>
  );

  if (page === "auth") return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif" }}>
      <div style={{ background:gR, padding:"56px 24px 36px", textAlign:"center" }}>
        <div style={{ fontSize:42 }}>🌸</div>
        <div style={{ color:"#fff", fontWeight:900, fontSize:22, marginTop:8 }}>Floresça</div>
      </div>
      <div style={{ padding:"24px 20px" }}>
        <div style={{ display:"flex", background:"#fff", borderRadius:14, padding:4, marginBottom:20, boxShadow:sh }}>
          {["login","register"].map(function(t){ return <div key={t} onClick={function(){ setTab(t); }} style={{ flex:1, padding:11, textAlign:"center", borderRadius:10, background:tab===t?gR:"transparent", color:tab===t?"#fff":"#7A5070", fontWeight:700, fontSize:14, cursor:"pointer" }}>{t==="login"?"Entrar":"Criar conta"}</div>; })}
        </div>
        <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:sh }}>
          {tab === "register" && <>
            <label style={{ fontSize:12, color:"#7A5070", fontWeight:700, display:"block", marginBottom:5 }}>SEU NOME</label>
            <input id="inp-nome" placeholder="Como podemos te chamar?" style={{ width:"100%", padding:12, borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:14, fontFamily:"sans-serif", marginBottom:12, boxSizing:"border-box" }}/>
          </>}
          <label style={{ fontSize:12, color:"#7A5070", fontWeight:700, display:"block", marginBottom:5 }}>EMAIL</label>
          <input id="inp-email" placeholder="seu@email.com" type="email" style={{ width:"100%", padding:12, borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:14, fontFamily:"sans-serif", marginBottom:12, boxSizing:"border-box" }}/>
          <label style={{ fontSize:12, color:"#7A5070", fontWeight:700, display:"block", marginBottom:5 }}>SENHA</label>
          <input placeholder="Sua senha" type="password" style={{ width:"100%", padding:12, borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:14, fontFamily:"sans-serif", marginBottom:16, boxSizing:"border-box" }}/>
          <button onClick={function(){
            var ne = document.getElementById("inp-nome");
            var ee = document.getElementById("inp-email");
            enviarLead(ne ? ne.value : "Usuária", ee ? ee.value : "");
            go("home");
          }} style={S(gR)}>{tab === "login" ? "Entrar na plataforma" : "Criar minha conta grátis 🌸"}</button>
          <div style={{ textAlign:"center", marginTop:14, fontSize:13, color:"#7A5070" }}>
            {tab === "login"
              ? <span>Não tem conta? <span onClick={function(){ setTab("register"); }} style={{ color:rose, fontWeight:700, cursor:"pointer" }}>Cadastre-se grátis</span></span>
              : <span>Já tem conta? <span onClick={function(){ setTab("login"); }} style={{ color:rose, fontWeight:700, cursor:"pointer" }}>Entrar</span></span>}
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:16 }}><span onClick={function(){ go("land"); }} style={{ color:"#7A5070", fontSize:13, cursor:"pointer" }}>← Voltar</span></div>
      </div>
    </div>
  );

  if (page === "home") return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:80 }}>
      <div style={{ background:gR, padding:"56px 22px 28px" }}>
        <div style={{ color:"rgba(255,255,255,.65)", fontSize:11, letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>Olá 🌸</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 2px", fontWeight:900 }}>Bem-vinda ao Floresça</h2>
        <p style={{ color:"rgba(255,255,255,.7)", fontSize:13, margin:0 }}>Seu espaço de crescimento e descoberta</p>
      </div>
      <div style={{ padding:"18px" }}>
        <div style={{ background:gG, borderRadius:18, padding:18, marginBottom:14, boxShadow:"0 6px 22px rgba(201,164,106,.3)" }}>
          <div style={{ color:"rgba(255,255,255,.7)", fontSize:10, letterSpacing:2, textTransform:"uppercase", marginBottom:5 }}>Aceleração Personalizada</div>
          <div style={{ color:"#fff", fontSize:16, fontWeight:900, marginBottom:5 }}>Quer resultado mais rápido?</div>
          <p style={{ color:"rgba(255,255,255,.85)", fontSize:13, margin:"0 0 14px", lineHeight:1.6 }}>Uma mentoria individual transforma meses em semanas.</p>
          <button onClick={function(){ go("consultoria"); }} style={S("#fff", { color:deep, width:"auto", padding:"10px 20px", fontSize:13 })}>✨ Quero minha Mentoria</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
          {[["🗺️","Mapa do Florescimento","Descubra sua paixão rentável","mapa",rose],["💡","Guia das Paixões","15+ paixões detalhadas","guia",gold],["🎓","Academia","Aulas e materiais","academy","#8B6B9E"],["💬","Comunidade","Em breve","home","#5EAD7E"]].map(function(x){ return (
            <div key={x[1]} onClick={function(){ go(x[3]); }} style={{ background:"#fff", borderRadius:14, padding:"15px 12px", cursor:"pointer", boxShadow:sh, borderLeft:"4px solid "+x[4] }}>
              <div style={{ fontSize:25, marginBottom:6 }}>{x[0]}</div>
              <div style={{ fontWeight:700, fontSize:13, color:"#3D2133", marginBottom:2 }}>{x[1]}</div>
              <div style={{ fontSize:11, color:"#7A5070" }}>{x[2]}</div>
            </div>
          ); })}
        </div>
        <div style={{ background:gR, borderRadius:18, padding:20 }}>
          <div style={{ color:"rgba(255,255,255,.7)", fontSize:11, marginBottom:6 }}>✨ GRATUITO</div>
          <div style={{ color:"#fff", fontSize:17, fontWeight:900, marginBottom:6 }}>Faça seu Mapa do Florescimento</div>
          <p style={{ color:"rgba(255,255,255,.85)", fontSize:13, lineHeight:1.75, margin:"0 0 16px" }}>6 etapas profundas para descobrir sua paixão mais rentável com resultado gerado por IA.</p>
          <button onClick={function(){ go("mapa"); }} style={S("#fff", { color:deep, width:"auto", padding:"10px 22px", fontSize:13 })}>🌸 Iniciar agora</button>
        </div>
      </div>
      <Nav page={page} go={go}/>
    </div>
  );

  if (page === "mapa") return <Mapa onFinalizar={gerarResultado} onVoltar={function(){ go("home"); }}/>;

  if (page === "loading") return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:32 }}>
      <div style={{ fontSize:64, marginBottom:20 }}>🌸</div>
      <h2 style={{ color:deep, fontSize:22, fontWeight:900, marginBottom:12 }}>Calculando seu Mapa...</h2>
      <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.75, maxWidth:300 }}>Nossa IA está analisando suas respostas para criar um resultado único. ✨</p>
    </div>
  );

  if (page === "result") {
    var r = result || FB;
    return (
      <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:40 }}>
        <div id="resultado-mapa">
          <div style={{ background:gR, padding:"56px 22px 38px", textAlign:"center" }}>
            <div style={{ fontSize:50, marginBottom:10 }}>🌸</div>
            <p style={{ color:"rgba(255,255,255,.65)", fontSize:11, letterSpacing:2, textTransform:"uppercase", margin:"0 0 8px" }}>Seu Mapa do Florescimento</p>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:900, margin:"0 0 10px" }}>{r.nome}</h2>
            <div style={{ background:"rgba(255,255,255,.15)", borderRadius:12, padding:"12px 16px" }}>
              <p style={{ color:"#fff", fontSize:14, fontStyle:"italic", margin:0, lineHeight:1.75 }}>"{r.nicho}"</p>
            </div>
          </div>
	</div>
          <div style={{ padding:"20px 18px", display:"flex", flexDirection:"column", gap:16 }}>
            {r.forca && (
              <div style={{ background:gG, borderRadius:16, padding:18, display:"flex", gap:14, alignItems:"flex-start" }}>
                <span style={{ fontSize:28, flexShrink:0 }}>💎</span>
                <div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,.75)", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Sua força oculta</div>
                  <p style={{ color:"#fff", fontSize:14, lineHeight:1.75, margin:0, fontWeight:600 }}>{r.forca}</p>
                </div>
              </div>
            )}

          <div style={{ background:"#fff", borderRadius:18, padding:22, boxShadow:sh }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:gR, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>🔍</div>
              <div>
                <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>Análise das suas respostas</div>
                <div style={{ fontSize:12, color:"#B8A0B0" }}>O que eu vi quando li o que você escreveu</div>
              </div>
            </div>
            {[["👁️","O que suas respostas revelam",r.analise1],["🧵","O fio condutor oculto",r.analise2],["💡","Seu diferencial no mercado",r.analise3],["🎯","O que você deve fazer",r.analise4]].map(function(x, i) {
              if (!x[2]) return null;
              return (
                <div key={i} style={{ marginBottom:i < 3 ? 18 : 0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:16 }}>{x[0]}</span>
                    <span style={{ fontSize:11, color:rose, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{x[1]}</span>
                  </div>
                  <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.85, margin:0, paddingLeft:24 }}>{x[2]}</p>
                  {i < 3 && <div style={{ height:1, background:"#F0D0DC", margin:"16px 0 0" }}/>}
                </div>
              );
            })}
          </div>

          {r.missao && (
            <div style={{ background:pale, borderRadius:16, padding:18, border:"2px solid #F0D0DC", display:"flex", gap:12, alignItems:"flex-start" }}>
              <span style={{ fontSize:24, flexShrink:0 }}>🌍</span>
              <div>
                <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Sua missão</div>
                <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.75, margin:0, fontWeight:600, fontStyle:"italic" }}>"{r.missao}"</p>
              </div>
            </div>
          )}

          <div style={{ fontSize:15, fontWeight:900, color:"#3D2133", display:"flex", alignItems:"center", gap:8 }}>
            <span>🎯</span><span>Seus 2 caminhos de renda</span>
          </div>

          {[{ ic:"⚡", label:"Caminho 1 — Serviço", bg:gR, nome:r.sn, pub:r.sp, desc:r.sd, preco:r.sv, passo:r.ss, renda:r.sr },
            { ic:"📦", label:"Caminho 2 — Produto", bg:gG, nome:r.pn, pub:r.pp, desc:r.pd, preco:r.pv, passo:r.ps, renda:r.pr }].map(function(t, i) {
            if (!t.nome) return null;
            return (
              <div key={i} style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:sh, overflow:"hidden" }}>
                <div style={{ background:t.bg, margin:"-20px -20px 16px -20px", padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:22 }}>{t.ic}</span>
                  <div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.75)", fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>{t.label}</div>
                    <div style={{ color:"#fff", fontSize:16, fontWeight:900, lineHeight:1.3 }}>{t.nome}</div>
                  </div>
                </div>
                {t.pub && <div style={{ fontSize:12, color:"#7A5070", marginBottom:10 }}>👥 <b>Para quem:</b> {t.pub}</div>}
                {t.desc && <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.75, margin:"0 0 14px" }}>{t.desc}</p>}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  {t.preco && <div style={{ background:pale, borderRadius:10, padding:"10px 12px" }}><div style={{ fontSize:10, color:rose, fontWeight:700, textTransform:"uppercase", marginBottom:4 }}>💳 Preço sugerido</div><div style={{ fontSize:13, fontWeight:900, color:"#3D2133" }}>{t.preco}</div></div>}
                  {t.renda && <div style={{ background:"#E8F5EE", borderRadius:10, padding:"10px 12px" }}><div style={{ fontSize:10, color:"#2D7A4F", fontWeight:700, textTransform:"uppercase", marginBottom:4 }}>📈 Em 90 dias</div><div style={{ fontSize:13, fontWeight:900, color:"#2D7A4F" }}>{t.renda}</div></div>}
                </div>
                {t.passo && (
                  <div style={{ background:"linear-gradient(135deg,#FFF5E6,#FFF9F0)", borderRadius:12, padding:"14px 16px", border:"2px solid "+gold }}>
                    <div style={{ fontSize:11, color:gold, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5, marginBottom:8 }}>🚀 Faça isso HOJE — menos de 2 horas</div>
                    <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.7, margin:0, fontWeight:600 }}>{t.passo}</p>
                  </div>
                )}
              </div>
            );
          })}

          {r.mensagem && (
            <div style={{ background:gR, borderRadius:18, padding:24, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>💫</div>
              <p style={{ color:"#fff", fontSize:15, lineHeight:1.9, margin:0, fontStyle:"italic", fontWeight:500 }}>"{r.mensagem}"</p>
            </div>
          )}

          <div style={{ background:"#fff", borderRadius:18, padding:22, boxShadow:sh, textAlign:"center" }}>
            <div style={{ fontSize:28, marginBottom:14 }}>🌺</div>
            <p style={{ color:"#3D2133", fontSize:15, fontWeight:700, lineHeight:1.85, margin:"0 0 12px" }}>Você não precisa se tornar outra pessoa para conquistar a vida que deseja.</p>
            <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.85, margin:"0 0 6px" }}>Você não precisa ter mais certificados.</p>
            <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.85, margin:"0 0 16px" }}>Você não precisa esperar o momento perfeito.</p>
            <p style={{ color:"#3D2133", fontSize:14, fontWeight:700, lineHeight:1.75, margin:"0 0 6px" }}>Seus talentos já existem.</p>
            <p style={{ color:"#3D2133", fontSize:14, fontWeight:700, lineHeight:1.75, margin:"0 0 16px" }}>Sua história já tem valor.</p>
            <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.85, margin:"0 0 18px" }}>O próximo passo é aprender a transformar isso em renda.</p>
            <div style={{ background:pale, borderRadius:14, padding:16, marginBottom:18, textAlign:"left" }}>
              <p style={{ color:"#3D2133", fontSize:13, fontWeight:700, margin:"0 0 10px" }}>Porque quando você cria sua própria fonte de renda, conquista algo ainda maior:</p>
              {["Mais liberdade para escolher","Mais tempo para viver","Mais presença para quem você ama","Mais realização por ser quem você nasceu para ser"].map(function(t, i){ return (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
                  <span style={{ color:gold }}>✨</span>
                  <p style={{ color:"#3D2133", fontSize:13, margin:0 }}>{t}</p>
                </div>
              ); })}
            </div>
            <h3 style={{ color:"#3D2133", fontSize:17, fontWeight:900, marginBottom:8 }}>Quer ir mais fundo?</h3>
            <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.75, margin:"0 0 18px" }}>Na mentoria individual, analisamos suas respostas juntas e eu te acompanho em cada passo rumo à sua independência financeira.</p>
            <button onClick={function(){ go("consultoria"); }} style={S(gG, { fontSize:15, borderRadius:50 })}>✨ Quero minha Mentoria Individual</button>
            <p style={{ color:"#B8A0B0", fontSize:12, marginTop:10 }}>Vagas limitadas — atendimento 1 a 1</p>
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:20 }}>
          <button onClick={salvarPDF} style={S(gR, { fontSize:14, width:"auto", padding:"12px 20px" })}>🙌 Salvar meu Mapa em PDF</button>
        </div>
        <div style={{ textAlign:"center", marginTop:12 }}><span onClick={function(){ go("home"); }} style={{ color:"#7A5070", fontSize:13, cursor:"pointer" }}>← Início</span></div>
      </div>
    );
  }

  if (page === "guia") {
    var cats = ["Todas"].concat(paixoes.reduce(function(a, p) { if (!a.includes(p.cat)) a.push(p.cat); return a; }, []));
    var filtradas = guiaCat === "Todas" ? paixoes : paixoes.filter(function(p){ return p.cat === guiaCat; });
    return (
      <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:80 }}>
        <div style={{ background:gR, padding:"56px 22px 26px" }}>
          <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 4px", fontWeight:900 }}>Guia das Paixões Remuneradas</h2>
          <p style={{ color:"rgba(255,255,255,.7)", fontSize:13, margin:0 }}>Como transformar cada paixão em renda real</p>
        </div>
        <div style={{ overflowX:"auto", padding:"14px 18px", display:"flex", gap:8 }}>
          {cats.map(function(c){ return <div key={c} onClick={function(){ setGuiaCat(c); }} style={{ flexShrink:0, padding:"8px 15px", borderRadius:50, background:guiaCat===c?rose:"#fff", color:guiaCat===c?"#fff":"#7A5070", fontWeight:700, fontSize:12, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,.07)", whiteSpace:"nowrap" }}>{c}</div>; })}
        </div>
        <div style={{ padding:"0 18px" }}>
          {filtradas.map(function(p){ return (
            <div key={p.id} onClick={function(){ setPaixaoAtual(p); go("paixao"); }} style={{ background:"#fff", borderRadius:16, padding:16, marginBottom:12, boxShadow:sh, display:"flex", alignItems:"center", gap:14, cursor:"pointer" }}>
              <div style={{ fontSize:36, flexShrink:0 }}>{p.emoji}</div>
              <div style={{ flex:1 }}>
                <span style={{ background:pale, color:rose, borderRadius:20, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{p.cat}</span>
                <div style={{ fontWeight:700, color:"#3D2133", fontSize:15, margin:"4px 0 2px" }}>{p.nome}</div>
                <div style={{ fontSize:12, color:"#5EAD7E", fontWeight:700 }}>💰 {p.renda}</div>
              </div>
              <div style={{ color:"#B8A0B0", fontSize:18 }}>›</div>
            </div>
          ); })}
        </div>
        <Nav page={page} go={go}/>
      </div>
    );
  }

  if (page === "paixao" && paixaoAtual) {
    var px = paixaoAtual;
    return (
      <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:40 }}>
        <div style={{ background:gR, padding:"56px 22px 34px" }}>
          <span onClick={function(){ go("guia"); }} style={{ color:"rgba(255,255,255,.65)", fontSize:13, cursor:"pointer", display:"block", marginBottom:14 }}>← Voltar ao Guia</span>
          <div style={{ fontSize:50, marginBottom:10 }}>{px.emoji}</div>
          <span style={{ background:"rgba(255,255,255,.2)", color:"#fff", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{px.cat}</span>
          <h2 style={{ color:"#fff", fontSize:23, margin:"8px 0 4px", fontWeight:900 }}>{px.nome}</h2>
          <div style={{ display:"flex", gap:10, marginTop:10 }}>
            <div style={{ background:"rgba(255,255,255,.15)", borderRadius:9, padding:"7px 13px" }}><div style={{ color:"rgba(255,255,255,.6)", fontSize:10 }}>POTENCIAL</div><div style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{px.renda}</div></div>
            <div style={{ background:"rgba(255,255,255,.15)", borderRadius:9, padding:"7px 13px" }}><div style={{ color:"rgba(255,255,255,.6)", fontSize:10 }}>1° RESULTADO</div><div style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{px.tempo}</div></div>
          </div>
        </div>
        <div style={{ padding:"22px 18px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:sh }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:9 }}>Sobre esta paixão</div>
            <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.85, margin:0 }}>{px.desc}</p>
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:sh }}>
            <div style={{ fontSize:11, color:gold, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Como monetizar</div>
            {px.monetizar.map(function(t, i){ return (
              <div key={i} style={{ display:"flex", gap:11, marginBottom:10, alignItems:"flex-start" }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:pale, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:12, fontWeight:900, color:rose }}>{i+1}</div>
                <p style={{ color:"#3D2133", fontSize:13, lineHeight:1.65, margin:0, paddingTop:3 }}>{t}</p>
              </div>
            ); })}
          </div>
          <div style={{ background:"linear-gradient(135deg,"+pale+",#fff)", borderRadius:16, padding:18, border:"2px solid #F0D0DC" }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:9 }}>Seu primeiro passo</div>
            <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.85, margin:0 }}>{px.passo}</p>
          </div>
          {px.instagrams && px.instagrams.length > 0 && (
            <div style={{ background:"#fff", borderRadius:16, padding:20, boxShadow:sh }}>
              <div style={{ fontSize:11, color:"#E1306C", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>Inspirações no Instagram</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {px.instagrams.map(function(ig){ return <span key={ig} onClick={function(){ window.open("https://instagram.com/"+ig.replace("@",""),"_blank"); }} style={{ background:"#FFF0F5", color:"#E1306C", borderRadius:20, padding:"6px 14px", fontSize:13, fontWeight:700, cursor:"pointer" }}>{ig.startsWith("@") ? ig : "@"+ig}</span>; })}
              </div>
            </div>
          )}
          <div style={{ background:gG, borderRadius:18, padding:22, textAlign:"center" }}>
            <div style={{ fontSize:22, marginBottom:9 }}>🌟</div>
            <div style={{ color:"#fff", fontSize:15, fontWeight:900, marginBottom:7 }}>Quero aprofundar esta paixão</div>
            <p style={{ color:"rgba(255,255,255,.85)", fontSize:13, lineHeight:1.75, margin:"0 0 16px" }}>Na mentoria, trabalhamos juntas para transformar esta paixão em negócio real.</p>
            <button onClick={function(){ go("consultoria"); }} style={S("#fff", { color:deep, width:"auto", padding:"11px 24px", fontSize:13 })}>✨ Quero minha Mentoria</button>
          </div>
        </div>
      </div>
    );
  }

  if (page === "consultoria") return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:40 }}>
      <div style={{ background:gR, padding:"56px 24px 40px", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:10 }}>🌺</div>
        <div style={{ color:"rgba(255,255,255,.75)", fontSize:11, letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>Mentoria Individual</div>
        <h1 style={{ color:"#fff", fontSize:22, fontWeight:900, lineHeight:1.35, margin:"0 0 14px" }}>E se o talento que você procura já estivesse dentro de você?</h1>
        <p style={{ color:"rgba(255,255,255,.85)", fontSize:14, lineHeight:1.8, margin:0 }}>Eu vou te ajudar a descobrir seus talentos, transformá-los em renda e construir uma vida com mais liberdade, tempo e realização.</p>
      </div>
      <div style={{ padding:"24px 18px", display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ background:"#fff", borderRadius:18, padding:20, boxShadow:sh }}>
          <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>Você se identifica com isso?</div>
          {["Sabe que nasceu para mais, mas não sabe qual caminho seguir.",
            "Não se vê vivendo a mesma rotina profissional pelos próximos 10 anos.",
            "Tem medo de cobrar pelo que faz.",
            "Não consegue enxergar como transformar seus conhecimentos em renda.",
            "Quer mais liberdade financeira.",
            "Gostaria de ter mais tempo para sua família e para si mesma.",
            "Sonha em construir algo seu.",
            "Sente que seus sonhos ficaram para depois."
          ].map(function(t, i){ return (
            <div key={i} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"flex-start" }}>
              <span style={{ fontSize:16, flexShrink:0 }}>😔</span>
              <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.65, margin:0 }}>{t}</p>
            </div>
          ); })}
          <div style={{ background:pale, borderRadius:12, padding:"12px 16px", marginTop:8 }}>
            <p style={{ color:rose, fontSize:14, fontWeight:700, margin:0 }}>Se você se reconheceu em alguma dessas situações, a mentoria foi feita para você. ❤️</p>
          </div>
        </div>

        <div style={{ background:gR, borderRadius:18, padding:20 }}>
          <div style={{ fontSize:11, color:"rgba(255,255,255,.75)", fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:12 }}>O que faremos juntas</div>
          <h3 style={{ color:"#fff", fontSize:18, fontWeight:900, marginBottom:14 }}>Acompanhamento individual, do seu jeito</h3>
          {["Descobrir seus talentos e diferenciais",
            "Identificar oportunidades reais de renda",
            "Construir sua primeira oferta",
            "Definir um plano simples e possível",
            "Desenvolver confiança para começar",
            "Avançar rumo à sua independência financeira",
            "Construir uma vida com mais liberdade e realização"
          ].map(function(t, i){ return (
            <div key={i} style={{ display:"flex", gap:12, marginBottom:10, alignItems:"flex-start" }}>
              <span style={{ color:gold, fontSize:16, flexShrink:0 }}>✨</span>
              <p style={{ color:"rgba(255,255,255,.9)", fontSize:14, lineHeight:1.65, margin:0 }}>{t}</p>
            </div>
          ); })}
        </div>

        <div style={{ background:pale, borderRadius:18, padding:22, border:"2px solid #F0D0DC" }}>
          <div style={{ fontSize:28, marginBottom:12, textAlign:"center" }}>🌷</div>
          <h3 style={{ color:deep, fontSize:17, fontWeight:900, marginBottom:10, textAlign:"center" }}>Você não precisa fazer isso sozinha</h3>
          <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.85, margin:"0 0 10px" }}>Durante anos você cuidou de todos.</p>
          <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.85, margin:"0 0 10px" }}>Agora é hora de olhar para você também.</p>
          <p style={{ color:"#3D2133", fontSize:14, lineHeight:1.85, margin:0 }}>Seu talento pode ser a porta de entrada para uma vida com mais liberdade, tempo e realização. E eu vou caminhar ao seu lado nessa jornada.</p>
        </div>

        <div style={{ background:gG, borderRadius:18, padding:20, textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:10 }}>⏳</div>
          <h3 style={{ color:"#fff", fontSize:18, fontWeight:900, marginBottom:8 }}>Vagas limitadas</h3>
          <p style={{ color:"rgba(255,255,255,.9)", fontSize:14, lineHeight:1.75, margin:0 }}>Trabalho com poucas mulheres por vez para garantir um acompanhamento real e de qualidade.</p>
        </div>

        <div style={{ background:"#fff", borderRadius:18, padding:22, boxShadow:sh, textAlign:"center" }}>
          <div style={{ fontSize:36, marginBottom:10 }}>💬</div>
          <h3 style={{ color:"#3D2133", fontSize:20, fontWeight:900, marginBottom:8 }}>Vamos conversar?</h3>
          <p style={{ color:"#7A5070", fontSize:14, lineHeight:1.75, margin:"0 0 20px" }}>Me manda uma mensagem no WhatsApp. Sem compromisso — vamos ver juntas se faz sentido para o seu momento.</p>
          <button onClick={function(){ window.open("https://wa.me/"+zap+"?text=Oi!%20Fiz%20o%20Mapa%20do%20Florescimento%20no%20Floresça%20e%20quero%20saber%20mais%20sobre%20a%20mentoria","_blank"); }} style={S("#25D366", { borderRadius:50, fontSize:16, padding:"16px" })}>📲 Chamar no WhatsApp agora</button>
          <p style={{ color:"#B8A0B0", fontSize:12, marginTop:12 }}>Respondo pessoalmente — sem robô, sem enrolação.</p>
        </div>
        <div style={{ textAlign:"center" }}><span onClick={function(){ go("home"); }} style={{ color:"#7A5070", fontSize:13, cursor:"pointer" }}>← Voltar</span></div>
      </div>
    </div>
  );

  if (page === "academy") return (
    <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:80 }}>
      <div style={{ background:gR, padding:"56px 22px 26px" }}>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 4px", fontWeight:900 }}>Academia Floresça</h2>
        <p style={{ color:"rgba(255,255,255,.7)", fontSize:13, margin:0 }}>Aulas para transformar sua paixão em renda</p>
      </div>
      <div style={{ padding:18 }}>
        {mods.map(function(m, i){ return (
          <div key={i} style={{ background:"#fff", borderRadius:16, marginBottom:12, boxShadow:sh, overflow:"hidden", position:"relative" }}>
            {!m.free && (
              <div style={{ position:"absolute", inset:0, background:"rgba(255,255,255,.92)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:2, borderRadius:16 }}>
                <div style={{ fontSize:28 }}>🔐</div>
                <div style={{ fontWeight:700, color:deep, fontSize:13, margin:"4px 0 8px" }}>Conteúdo Premium</div>
                <button onClick={function(){ go("consultoria"); }} style={S(gR, { width:"auto", padding:"8px 18px", fontSize:12 })}>Desbloquear</button>
              </div>
            )}
            <div style={{ display:"flex", gap:12, padding:14 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:gR, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{m.ic}</div>
              <div>
                <div style={{ display:"flex", gap:5, marginBottom:4 }}>
                  <span style={{ background:m.free?"#E8F5EE":pale, color:m.free?"#2D7A4F":rose, borderRadius:20, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{m.free?"✓ Grátis":"⭐ Premium"}</span>
                  <span style={{ background:pale, color:deep, borderRadius:20, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{m.cat}</span>
                </div>
                <div style={{ fontWeight:700, color:"#3D2133", fontSize:13, marginBottom:2 }}>{m.t}</div>
                <div style={{ fontSize:11, color:"#B8A0B0" }}>⏱ {m.dur}</div>
              </div>
            </div>
          </div>
        ); })}
      </div>
      <Nav page={page} go={go}/>
    </div>
  );

  if (page === "adm") {
    var iS = { width:"100%", padding:"11px 13px", borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:13, fontFamily:"sans-serif", boxSizing:"border-box", marginBottom:4 };
    return (
      <div style={{ background:pale, minHeight:"100vh", maxWidth:480, margin:"0 auto", fontFamily:"sans-serif", paddingBottom:40 }}>
        <div style={{ background:gR, padding:"56px 22px 26px", display:"flex", alignItems:"center", gap:12 }}>
          <span onClick={function(){ go("land"); }} style={{ color:"rgba(255,255,255,.65)", cursor:"pointer", fontSize:22 }}>←</span>
          <div><div style={{ color:"rgba(255,255,255,.65)", fontSize:11, letterSpacing:2 }}>ADMINISTRAÇÃO</div><h2 style={{ color:"#fff", fontSize:20, margin:0, fontWeight:900 }}>Painel ADM</h2></div>
        </div>
        <div style={{ padding:18 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:14, boxShadow:sh }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>📱 WhatsApp da Mentoria</div>
            <label style={{ fontSize:12, color:"#7A5070", fontWeight:700, display:"block", marginBottom:5 }}>NÚMERO (com 55 e DDD)</label>
            <input value={zap} onChange={function(e){ var v = e.target.value.replace(/\D/g, ""); setZap(v); try { localStorage.setItem("fl_zap", v); } catch(ex) {} }} placeholder="ex: 5511999998888" style={iS}/>
            <div style={{ fontSize:12, color:"#5EAD7E", fontWeight:600, marginTop:6 }}>✓ Este número é usado no botão "Chamar no WhatsApp"</div>
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:14, boxShadow:sh }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>🏠 Página Inicial</div>
            <label style={{ fontSize:12, color:"#7A5070", fontWeight:700, display:"block", marginBottom:5 }}>FRASE PRINCIPAL</label>
            <textarea value={hero} onChange={function(e){ var v = e.target.value; setHero(v); try { localStorage.setItem("fl_hero", v); } catch(ex) {} }} style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:13, fontFamily:"sans-serif", resize:"none", height:80, boxSizing:"border-box", marginBottom:14, lineHeight:1.6 }}/>
            <label style={{ fontSize:12, color:"#7A5070", fontWeight:700, display:"block", marginBottom:5 }}>NÚMEROS DE PROVA SOCIAL</label>
            {stats.map(function(s, i){ return (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
                <input value={s[0]} onChange={function(e){ setStat(i, 0, e.target.value); }} placeholder="ex: 2.400+" style={Object.assign({}, iS, { marginBottom:0, width:110, flexShrink:0 })}/>
                <input value={s[1]} onChange={function(e){ setStat(i, 1, e.target.value); }} placeholder="ex: Mulheres" style={Object.assign({}, iS, { marginBottom:0, flex:1, width:"auto" })}/>
              </div>
            ); })}
            <div style={{ fontSize:11, color:"#B8A0B0", marginTop:4 }}>Valor à esquerda, rótulo à direita. As mudanças aparecem na hora na página inicial.</div>
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:14, boxShadow:sh }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>📊 Google Sheets — Leads</div>
            <input defaultValue={webhook} placeholder="https://script.google.com/macros/s/..." onChange={function(e){ localStorage.setItem("fl_wh", e.target.value); setWebhook(e.target.value); }} style={iS}/>
            <div style={{ fontSize:12, color:"#5EAD7E", fontWeight:600, marginTop:6 }}>{webhook ? "✓ Webhook configurado" : "⚠ Nenhum webhook configurado"}</div>
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:14, boxShadow:sh }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>🔓 Alunas com Acesso Premium</div>
            <p style={{ color:"#7A5070", fontSize:12, lineHeight:1.6, margin:"0 0 12px" }}>Adicione o e-mail de quem pagou. O acesso premium é liberado automaticamente no login.</p>
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              <input value={newEmail} onChange={function(e){ setNewEmail(e.target.value); }} onKeyDown={function(e){ if(e.key==="Enter" && newEmail.trim()){ setPaidEmails(function(p){ return p.includes(newEmail.trim().toLowerCase())?p:p.concat([newEmail.trim().toLowerCase()]); }); setNewEmail(""); }}} placeholder="email@exemplo.com" style={{ flex:1, padding:"10px 13px", borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:13, fontFamily:"sans-serif" }}/>
              <button onClick={function(){
                var v = newEmail.trim().toLowerCase();
                if(!v) return;
                setPaidEmails(function(p){ return p.includes(v)?p:p.concat([v]); });
                setNewEmail("");
              }} style={{ background:gR, color:"#fff", border:"none", borderRadius:10, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer" }}>+ Adicionar</button>
            </div>
            {paidEmails.length === 0
              ? <p style={{ color:"#B8A0B0", fontSize:12, textAlign:"center", margin:0 }}>Nenhuma aluna premium cadastrada ainda.</p>
              : paidEmails.map(function(em){ return (
                <div key={em} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #F0D0DC" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:16 }}>✅</span>
                    <span style={{ fontSize:13, color:"#3D2133", fontWeight:600 }}>{em}</span>
                  </div>
                  <span onClick={function(){ setPaidEmails(function(p){ return p.filter(function(x){ return x!==em; }); }); }} style={{ background:"#FFE9E9", color:"#C0392B", borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>✕ Remover</span>
                </div>
              ); })
            }
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:14, boxShadow:sh }}>
            <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>🎓 Módulos da Academia</div>
            {mods.map(function(m, i){ return (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #F0D0DC" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:18 }}>{m.ic}</span><b style={{ fontSize:13, color:"#3D2133" }}>{m.t}</b></div>
                <span onClick={function(){ setMods(function(prev){ return prev.map(function(x, j){ return j===i ? Object.assign({}, x, { free:!x.free }) : x; }); }); }} style={{ background:m.free?"#E8F5EE":pale, color:m.free?"#2D7A4F":rose, borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>{m.free?"Grátis":"Pago"}</span>
              </div>
            ); })}
          </div>
          <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:14, boxShadow:sh }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontSize:11, color:rose, fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>💡 Paixões Remuneradas</div>
              <button onClick={function(){ setShowNewP(true); }} style={{ background:gR, color:"#fff", border:"none", borderRadius:50, padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Nova</button>
            </div>
            {showNewP && (
              <div style={{ background:pale, borderRadius:14, padding:16, marginBottom:16 }}>
                <div style={{ fontSize:12, color:rose, fontWeight:700, marginBottom:12 }}>Nova Paixão Remunerada</div>
                {[["emoji","Emoji","🌸"],["nome","Nome","ex: Pintura em Tela"],["cat","Categoria","ex: Arte & Visual"],["renda","Renda Estimada","ex: R$1k a R$5k/mes"],["tempo","Tempo para Resultado","ex: 1 a 2 meses"],["passo","Primeiro Passo","Acao concreta"]].map(function(f){ return (
                  <div key={f[0]}>
                    <label style={{ fontSize:11, color:"#7A5070", fontWeight:700, display:"block", marginBottom:4 }}>{f[1].toUpperCase()}</label>
                    <input placeholder={f[2]} value={newP[f[0]]} onChange={function(ev){ var v = ev.target.value; setNewP(function(p){ return Object.assign({}, p, { [f[0]]:v }); }); }} style={Object.assign({}, iS, { marginBottom:10 })}/>
                  </div>
                ); })}
                <label style={{ fontSize:11, color:"#7A5070", fontWeight:700, display:"block", marginBottom:4 }}>DESCRICAO</label>
                <textarea placeholder="Descreva esta paixao..." value={newP.desc} onChange={function(ev){ var v = ev.target.value; setNewP(function(p){ return Object.assign({}, p, { desc:v }); }); }} style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:13, fontFamily:"sans-serif", resize:"none", height:70, boxSizing:"border-box", marginBottom:10 }}/>
                <label style={{ fontSize:11, color:"#7A5070", fontWeight:700, display:"block", marginBottom:4 }}>COMO MONETIZAR (uma por linha)</label>
                <textarea placeholder="Venda de produtos" value={newP.mon} onChange={function(ev){ var v = ev.target.value; setNewP(function(p){ return Object.assign({}, p, { mon:v }); }); }} style={{ width:"100%", padding:"11px 13px", borderRadius:10, border:"1.5px solid #F0D0DC", fontSize:13, fontFamily:"sans-serif", resize:"none", height:70, boxSizing:"border-box", marginBottom:10 }}/>
                <label style={{ fontSize:11, color:"#7A5070", fontWeight:700, display:"block", marginBottom:4 }}>INSTAGRAMS (separados por virgula)</label>
                <input placeholder="@conta1, @conta2" value={newP.insta} onChange={function(ev){ var v = ev.target.value; setNewP(function(p){ return Object.assign({}, p, { insta:v }); }); }} style={Object.assign({}, iS, { marginBottom:12 })}/>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={function(){
                    var nova = { id:"p"+Date.now(), nome:newP.nome, emoji:newP.emoji||"🌸", cat:newP.cat||"Outras", desc:newP.desc, monetizar:newP.mon.split("\n").filter(Boolean), renda:newP.renda, tempo:newP.tempo, passo:newP.passo, instagrams:newP.insta.split(",").map(function(s){ return s.trim(); }).filter(Boolean) };
                    setPaixoes(function(prev){ return prev.concat([nova]); });
                    setShowNewP(false);
                    setNewP({ emoji:"🌸", nome:"", cat:"", desc:"", mon:"", renda:"", tempo:"", passo:"", insta:"" });
                  }} style={{ background:gR, color:"#fff", border:"none", borderRadius:50, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer" }}>Salvar</button>
                  <button onClick={function(){ setShowNewP(false); }} style={{ background:pale, color:deep, border:"none", borderRadius:50, padding:"10px 20px", fontSize:13, cursor:"pointer" }}>Cancelar</button>
                </div>
              </div>
            )}
            {paixoes.map(function(p){ return (
              <div key={p.id} style={{ padding:"12px 0", borderBottom:"1px solid #F0D0DC" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:20 }}>{p.emoji}</span>
                    <div>
                      <b style={{ fontSize:13, color:"#3D2133" }}>{p.nome}</b>
                      <div style={{ fontSize:11, color:"#B8A0B0" }}>{p.instagrams && p.instagrams.length > 0 ? p.instagrams.join(", ") : "Sem instagrams"}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <span onClick={function(){ setEditInstaId(editInstaId===p.id?null:p.id); setEditInstaVal((p.instagrams||[]).join(", ")); }} style={{ background:pale, color:rose, borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>✎</span>
                    <span onClick={function(){ if (window.confirm("Remover?")) setPaixoes(function(prev){ return prev.filter(function(x){ return x.id!==p.id; }); }); }} style={{ background:"#FFE9E9", color:"#C0392B", borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer" }}>✕</span>
                  </div>
                </div>
                {editInstaId === p.id && (
                  <div style={{ background:pale, borderRadius:10, padding:12, marginTop:10 }}>
                    <input value={editInstaVal} onChange={function(e){ setEditInstaVal(e.target.value); }} placeholder="@conta1, @conta2" style={Object.assign({}, iS, { marginBottom:10 })}/>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={function(){
                        var list = editInstaVal.split(",").map(function(s){ return s.trim(); }).filter(Boolean);
                        setPaixoes(function(prev){ return prev.map(function(x){ return x.id===p.id ? Object.assign({}, x, { instagrams:list }) : x; }); });
                        setEditInstaId(null);
                      }} style={{ background:gR, color:"#fff", border:"none", borderRadius:50, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>Salvar</button>
                      <button onClick={function(){ setEditInstaId(null); }} style={{ background:"#eee", color:"#666", border:"none", borderRadius:50, padding:"8px 16px", fontSize:12, cursor:"pointer" }}>Cancelar</button>
                    </div>
                  </div>
                )}
              </div>
            ); })}
          </div>
          <button onClick={function(){ alert("Configuracoes salvas!"); }} style={S(gR, { borderRadius:13, padding:"16px" })}>Salvar configuracoes</button>
        </div>
      </div>
    );
  }

  return null;
}
