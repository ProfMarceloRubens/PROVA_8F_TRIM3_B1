// ==========================================
// 1. CONFIGURAÇÃO DO FIREBASE (v13 Modular)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getDatabase, ref, get, child, set, remove } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9y0tW7OH3hXPJD1RZsIntBb76KOYZxvA",
  authDomain: "prova-1ds-trim3-b1.firebaseapp.com",
  databaseURL: "https://prova-1ds-trim3-b1-default-rtdb.firebaseio.com",
  projectId: "prova-1ds-trim3-b1",
  storageBucket: "prova-1ds-trim3-b1.firebasestorage.app",
  messagingSenderId: "266741572349",
  appId: "1:266741572349:web:c4bcd4e8388585e21fd494"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ==========================================
// 2. LISTA OFICIAL DE ESTUDANTES (TURMA 8ºF)
// ==========================================
const studentList = [
  "Agatha Rafaelly", "Alice Gabriely", "Arthur dos Santos", "Arthur Gardin",
  "Arthur Tokarski", "Bernardo Araújo", "Bernardo Felipe", "Bernardo Hidalgo",
  "Caetano Ramos", "Eduarda Vitória", "Emanuelly Stresser", "Emili Ferreira",
  "Enzo Gramacho", "Enzo Lopes", "Gabriel Gonçalves", "Gabriel Santanna",
  "Gabriel Soares", "Hellena Pereira", "Heloíse Hadara", "Isabela Sophia",
  "Isabelle Batista", "Izabelly Cristina", "João Pedro", "Laísa Ruske",
  "Lucca Ceccatto", "Maria Eduarda", "Maria Vitória", "Pedro Henrique",
  "Sophia Soares", "Stephany Vitória", "Victorio Henrique", "Vinícius Bernardo"
];

// ==========================================
// 3. BANCO DE 30 QUESTÕES - PORTUGOL STUDIO (8ºF)
// ==========================================
const questionBank = [
  // CONCEITOS BÁSICOS & FERRAMENTAS
  { id: 1, text: "O Portugol é uma linguagem de programação criada com o objetivo de:", options: ["Ensinar a lógica de programação em português", "Desenvolver jogos em 3D profissionais", "Substituir o HTML nos sites", "Criar aplicativos para celulares Android"], answer: "Ensinar a lógica de programação em português" },
  { id: 2, text: "Qual é a função do Portugol Studio no nosso computador?", options: ["É a ferramenta onde digitamos, executamos e vemos o programa rodar", "É um navegador de internet como o Chrome", "É um editor de fotos e imagens", "É um antivírus para proteção de dados"], answer: "É a ferramenta onde digitamos, executamos e vemos o programa rodar" },
  { id: 3, text: "No Portugol Studio, qual símbolo ou caractere representa o botão de executar o código?", options: ["Um ícone de play (▶️)", "Um símbolo de mais (+)", "Uma chave ({})", "Uma estrela (*)"], answer: "Um ícone de play (▶️)" },
  
  // VARIÁVEIS E TIPOS DE DADOS
  { id: 4, text: "Na metáfora do armário e gavetas, o que representa uma 'variável' na memória do computador?", options: ["Uma gaveta com etiqueta que guarda uma informação específica", "O cabo de energia da máquina", "A tela do monitor onde vemos as frases", "O botão de desligar o computador"], answer: "Uma gaveta com etiqueta que guarda uma informação específica" },
  { id: 5, text: "Qual tipo de dado deve ser utilizado para guardar o nome de uma pessoa ou uma frase?", options: ["cadeia", "inteiro", "real", "logico"], answer: "cadeia" },
  { id: 6, text: "Valores armazenados em variáveis do tipo 'cadeia' devem ficar obrigatoriamente entre:", options: ["Aspas duplas ( \" \" )", "Parênteses ( ( ) )", "Colchetes ( [ ] )", "Barra e asterisco ( /* */ )"], answer: "Aspas duplas ( \" \" )" },
  { id: 7, text: "Se precisamos guardar a idade de um aluno em anos (ex: 13 ou 14), qual tipo de variável é mais adequado?", options: ["inteiro", "real", "cadeia", "caracter"], answer: "inteiro" },
  { id: 8, text: "Para armazenar o preço de um lanche na cantina (ex: 15.50), qual tipo de variável devemos declarar?", options: ["real", "inteiro", "cadeia", "vazio"], answer: "real" },
  { id: 9, text: "Qual das opções a seguir é um exemplo correto de valor do tipo 'real'?", options: ["1.75", "13", "\"Guerreiro\"", "falso"], answer: "1.75" },
  { id: 10, text: "Ao nomear uma variável no Portugol Studio, qual das regras abaixo deve ser respeitada para evitar erros?", options: ["Não usar espaços nem acentos no nome da variável", "Começar o nome sempre com um número", "Usar aspas no nome da variável", "Escrever tudo em letras maiúsculas obrigatoriamente"], answer: "Não usar espaços nem acentos no nome da variável" },

  // COMANDOS DE ENTRADA E SAÍDA (escreva e leia)
  { id: 11, text: "Qual é a função do comando 'escreva()' em Portugol?", options: ["Exibir textos ou resultados na tela para o usuário", "Aguardar o usuário digitar algo no teclado", "Apagar os dados da memória", "Fechar a janela do programa"], answer: "Exibir textos ou resultados na tela para o usuário" },
  { id: 12, text: "O comando 'leia()' é utilizado para:", options: ["Aguardar e guardar o dado digitado pelo usuário em uma variável", "Imprimir um relatório no papel", "Tocar um som no alto-falante", "Mudar a cor de fundo do programa"], answer: "Aguardar e guardar o dado digitado pelo usuário em uma variável" },
  { id: 13, text: "Para pular uma linha na saída de texto do comando 'escreva()', usamos o caractere especial:", options: ["\\n", "\\p", "/pula", "==pula=="], answer: "\\n" },
  { id: 14, text: "No comando 'escreva()', o que usamos para juntar (concatenar) um texto fixo com o valor de uma variável?", options: ["Vírgula ( , )", "Ponto final ( . )", "Símbolo de e comercial ( & )", "Traço ( - )"], answer: "Vírgula ( , )" },
  { id: 15, text: "Dentro do comando escreva(\"Olá\", nome), a palavra entre aspas (\"Olá\") representa:", options: ["Um texto fixo que será exibido exatamente como foi escrito", "O nome de uma variável", "O nome do comando de entrada", "Um número inteiro"], answer: "Um texto fixo que será exibido exatamente como foi escrito" },

  // ANÁLISE DE CÓDIGO - ATIVIDADE 1 (Gerador de Nickname)
  { id: 16, code: "cadeia cor\ncadeia animal\ncor = \"Azul\"\nanimal = \"Cobra\"\nescreva(cor, animal, \"123\")", text: "Qual será a saída gerada pelo trecho de código acima?", options: ["AzulCobra123", "cor animal 123", "Azul Cobra 123", "Erro de compilação"], answer: "AzulCobra123" },
  { id: 17, text: "No programa 'Gerador de Nickname Gamer', as variáveis 'cor' e 'animal' foram declaradas com qual tipo?", options: ["cadeia", "inteiro", "real", "logico"], answer: "cadeia" },

  // ANÁLISE DE CÓDIGO - ATIVIDADE 2 (Ficha de RPG)
  { id: 18, code: "cadeia nomeHeroi = \"Mage\"\ninteiro nivel = 10\nescreva(nomeHeroi, \" - Lvl \", nivel)", text: "Qual a saída exata impressa pelo comando escreva acima?", options: ["Mage - Lvl 10", "nomeHeroi - Lvl nivel", "Mage Lvl 10", "10 - Lvl Mage"], answer: "Mage - Lvl 10" },
  { id: 19, text: "No cadastro de um personagem de RPG, se declararmos a variável 'nivel' como 'cadeia' em vez de 'inteiro':", options: ["Ela guardará o número como texto, impedindo contas matemáticas futuras", "O programa pegará fogo", "O nível passará a ter casas decimais automaticamente", "O Portugol Studio converterá sozinho para número real"], answer: "Ela guardará o número como texto, impedindo contas matemáticas futuras" },

  // ANÁLISE DE CÓDIGO - ATIVIDADE 3 (Calculadora de Dias de Vida)
  { id: 20, code: "inteiro idadeAnos = 10\ninteiro diasAproximados\ndiasAproximados = idadeAnos * 365\nescreva(diasAproximados)", text: "Qual valor será exibido na tela ao executar o código?", options: ["3650", "365", "10", "36510"], answer: "3650" },
  { id: 21, text: "Qual operador matemático é utilizado no Portugol para realizar a multiplicação da idade por 365?", options: ["Asterisco ( * )", "Letra X ( x )", "Barra ( / )", "Sinal de mais ( + )"], answer: "Asterisco ( * )" },

  // ANÁLISE DE CÓDIGO - ATIVIDADE 4 (Comandante de Lanchonete)
  { id: 22, code: "cadeia lanche = \"Pipoca\"\nreal preco = 12.50\nescreva(\"Pedido: \", lanche, \" R$ \", preco)", text: "Qual a saída deste código?", options: ["Pedido: Pipoca R$ 12.50", "Pedido: lanche R$ preco", "Pipoca 12.50", "Erro de tipo de dado"], answer: "Pedido: Pipoca R$ 12.50" },
  { id: 23, text: "Por que a variável 'preco' na atividade da Lanchonete deve ser do tipo 'real'?", options: ["Porque valores em dinheiro possuem centavos (casas decimais)", "Porque lanches só aceitam texto", "Porque o tipo 'inteiro' não aceita números", "Para o Portugol conseguir aplicar desconto sozinho"], answer: "Porque valores em dinheiro possuem centavos (casas decimais)" },

  // ANÁLISE DE CÓDIGO - ATIVIDADE 5 (Histórias Malucas)
  { id: 24, code: "cadeia amigo = \"Pedro\"\ncadeia lugar = \"Pátio\"\nescreva(amigo, \" está no \", lugar)", text: "Qual será a mensagem exibida?", options: ["Pedro está no Pátio", "amigo está no lugar", "Pedroestá noPátio", "Erro de sintaxe"], answer: "Pedro está no Pátio" },
  { id: 25, text: "Na atividade 'Gerador de Histórias Malucas', foram utilizadas 3 variáveis de qual tipo?", options: ["Todas do tipo cadeia", "Duas do tipo inteiro e uma real", "Todas do tipo real", "Duas do tipo cadeia e uma inteiro"], answer: "Todas do tipo cadeia" },

  // SINTAXE E ESTRUTURA DO PORTUGOL
  { id: 26, text: "Todo programa em Portugol Studio deve ter sua lógica principal escrita dentro da função:", options: ["inicio()", "principal()", "escreva()", "executar()"], answer: "inicio()" },
  { id: 27, text: "O bloco de código da função inicio() no Portugol fica delimitado por:", options: ["Chaves ( { } )", "Parênteses ( ( ) )", "Colchetes ( [ ] )", "Aspas ( \" \" )"], answer: "Chaves ( { } )" },
  { id: 28, text: "O que acontece se tentarmos ler um texto digitado pelo usuário dentro de uma variável do tipo 'inteiro'?", options: ["Ocorrerá um erro de conversão/tipo de dado no programa", "O programa salva o texto normalmente", "A variável apaga o texto", "O Portugol transforma o texto em zero automaticamente"], answer: "Ocorrerá um erro de conversão/tipo de dado no programa" },
  { id: 29, text: "Para inserir comentários no código que não são executados pelo computador, usamos:", options: ["Duas barras ( // )", "Dois pontos ( : )", "Sinal de igual ( == )", "Jogo da velha ( # )"], answer: "Duas barras ( // )" },
  { id: 30, text: "Qual é o resultado da expressão 5 + 5 * 2 no Portugol?", options: ["15", "20", "25", "10"], answer: "15" }
];

// Variáveis Globais de Controle
let selectedStudent = "";
let selectedQuestions = [];
let evaluationsData = [];
let focusLossCount = 0; // Contador de trocas de aba do aluno

// ==========================================
// 4. MÓDULO DE SEGURANÇA E ANTI-COLA
// ==========================================
function applySecurityMeasures() {
  // 1. Bloquear Botão Direito do Mouse
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("O clique com o botão direito está desativado durante a avaliação.");
  });

  // 2. Bloquear Atalhos de Teclado (Ctrl+C, Ctrl+U, Ctrl+P, F12, PrintScreen)
  document.addEventListener("keydown", (e) => {
    // Tecla PrintScreen
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      e.preventDefault();
      alert("Capturas de tela não são permitidas nesta avaliação.");
      return false;
    }

    // Atalhos do Navegador (Copiar, Ver Código Fonte, Imprimir, DevTools)
    if (
      (e.ctrlKey && (e.key === "c" || e.key === "C" || e.key === "u" || e.key === "U" || e.key === "p" || e.key === "P")) ||
      e.key === "F12"
    ) {
      e.preventDefault();
      alert("Este atalho foi desativado por questões de segurança da avaliação.");
      return false;
    }
  });

  // 3. Monitorar Troca de Aba ou Minimizar Navegador
  document.addEventListener("visibilitychange", () => {
    const cardQuiz = document.getElementById("cardQuiz");

    // Só monitora se o aluno estiver ativamente fazendo a prova
    if (cardQuiz && cardQuiz.style.display !== "none") {
      if (document.hidden) {
        focusLossCount++;
        cardQuiz.classList.add("blur-protection");
      } else {
        cardQuiz.classList.remove("blur-protection");
        alert(`ATENÇÃO ${selectedStudent}!\nVocê saiu da aba da prova ${focusLossCount} vez(es).\nLembre-se de que a troca de abas é registrada.`);
      }
    }
  });

  // 4. Bloquear Copiar, Cortar e Colar
  document.addEventListener("copy", (e) => e.preventDefault());
  document.addEventListener("cut", (e) => e.preventDefault());
  document.addEventListener("paste", (e) => e.preventDefault());
}

// ==========================================
// 5. INICIALIZAÇÃO DEPENDENDO DA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("studentSelect")) {
    initStudentPage();
    applySecurityMeasures(); // Ativa a segurança na página do aluno
  }

  if (document.getElementById("adminTable")) {
    initAdminPage();
  }
});

// ==========================================
// 6. LÓGICA DA PÁGINA DO ESTUDANTE (index.html)
// ==========================================
function initStudentPage() {
  const select = document.getElementById("studentSelect");
  
  studentList.forEach(student => {
    const opt = document.createElement("option");
    opt.value = student;
    opt.textContent = student;
    select.appendChild(opt);
  });

  document.getElementById("btnAdminAccess").addEventListener("click", () => {
    const pass = prompt("Digite a senha do Administrador:");
    if (pass === "masaju1820") {
      window.location.href = "admin.html";
    } else if (pass !== null) {
      alert("Senha incorreta!");
    }
  });

  document.getElementById("btnStart").addEventListener("click", startQuiz);
  document.getElementById("quizForm").addEventListener("submit", submitQuiz);
}

async function startQuiz() {
  const select = document.getElementById("studentSelect");
  selectedStudent = select.value;

  if (!selectedStudent) {
    alert("Por favor, selecione seu nome!");
    return;
  }

  const studentKey = selectedStudent.replace(/[^a-zA-Z0-9]/g, "_");

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `evaluations_8f/${studentKey}`));

    if (snapshot.exists()) {
      alert("Atenção: Você já realizou esta avaliação anteriormente!");
    } else {
      focusLossCount = 0; // Reseta o contador ao iniciar
      selectedQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 15);
      renderQuestions();

      document.getElementById("cardLogin").style.display = "none";
      document.getElementById("cardQuiz").style.display = "block";
      document.getElementById("studentGreeting").textContent = `Aluno: ${selectedStudent}`;
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o banco de dados.");
  }
}

function renderQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  selectedQuestions.forEach((q, index) => {
    const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());

    const qDiv = document.createElement("div");
    qDiv.className = "card question-card";

    let codeHTML = q.code ? `<div class="code-block">${q.code}</div>` : "";

    let optionsHTML = shuffledOptions.map(opt => `
      <label class="option-label">
        <input type="radio" name="q_${index}" value="${opt}" required>
        <span>${opt}</span>
      </label>
    `).join("");

    qDiv.innerHTML = `
      <div class="question-title">${index + 1}. ${q.text}</div>
      ${codeHTML}
      <div class="options-group">${optionsHTML}</div>
    `;

    container.appendChild(qDiv);
  });
}

async function submitQuiz(e) {
  e.preventDefault();

  let correctCount = 0;

  selectedQuestions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q_${index}"]:checked`);
    if (selectedOption && selectedOption.value === q.answer) {
      correctCount++;
    }
  });

  const finalScore = parseFloat((correctCount * 0.2).toFixed(1));
  const studentKey = selectedStudent.replace(/[^a-zA-Z0-9]/g, "_");
  const now = new Date();

  const record = {
    studentName: selectedStudent,
    score: finalScore,
    correctAnswers: correctCount,
    totalQuestions: 15,
    tabSwitches: focusLossCount, // Grava quantas vezes o aluno trocou de aba
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR")
  };

  try {
    await set(ref(database, `evaluations_8f/${studentKey}`), record);
    document.getElementById("cardQuiz").style.display = "none";
    document.getElementById("cardSuccess").style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar suas respostas no banco de dados.");
  }
}

// ==========================================
// 7. LÓGICA DO PAINEL DO PROFESSOR (admin.html)
// ==========================================
function initAdminPage() {
  document.getElementById("btnExit").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.getElementById("btnExportCSV").addEventListener("click", exportToCSV);
  
  const btnReset = document.getElementById("btnResetData");
  if (btnReset) {
    btnReset.addEventListener("click", resetDatabase);
  }

  loadAdminData();
}

async function loadAdminData() {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "evaluations_8f"));

    const tbody = document.querySelector("#adminTable tbody");
    tbody.innerHTML = "";

    if (!snapshot.exists()) {
      evaluationsData = [];
      document.getElementById("mTotal").textContent = "0 / 32";
      document.getElementById("mAverage").textContent = "0.0";
      document.getElementById("mMax").textContent = "0.0";
      document.getElementById("mMin").textContent = "0.0";
      tbody.innerHTML = "<tr><td colspan='4'>Nenhuma avaliação realizada até o momento.</td></tr>";
      return;
    }

    evaluationsData = Object.values(snapshot.val());

    const total = evaluationsData.length;
    const scores = evaluationsData.map(e => e.score);
    const avg = (scores.reduce((a, b) => a + b, 0) / total).toFixed(1);
    const max = Math.max(...scores).toFixed(1);
    const min = Math.min(...scores).toFixed(1);

    document.getElementById("mTotal").textContent = `${total} / 32`;
    document.getElementById("mAverage").textContent = avg;
    document.getElementById("mMax").textContent = max;
    document.getElementById("mMin").textContent = min;

    evaluationsData.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${item.studentName}</strong></td>
        <td>${item.score.toFixed(1)}</td>
        <td>${item.correctAnswers} / 15</td>
        <td>${item.formattedDate} ${item.tabSwitches ? `<br><small style="color: #c0392b;">(Trocou de aba ${item.tabSwitches}x)</small>` : ''}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

function exportToCSV() {
  if (evaluationsData.length === 0) {
    alert("Não há dados para exportar.");
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Estudante;Nota;Acertos;Saidas de Aba;Data e Horario\n";

  evaluationsData.forEach(item => {
    csvContent += `"${item.studentName}";"${item.score.toFixed(1)}";"${item.correctAnswers}/15";"${item.tabSwitches || 0}";"${item.formattedDate}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `relatorio_prova_8F_CESF.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function resetDatabase() {
  const confirmPass = prompt("ATENÇÃO: Isso apagará TODOS os registros da turma 8F!\nDigite a senha do admin para confirmar:");
  
  if (confirmPass === "masaju1820") {
    try {
      await remove(ref(database, "evaluations_8f"));
      alert("Todos os dados foram removidos com sucesso!");
      loadAdminData();
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar resetar o banco de dados.");
    }
  } else if (confirmPass !== null) {
    alert("Senha incorreta! Operação cancelada.");
  }
}