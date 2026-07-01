/**
 * Single source of truth for the "Assistente Remoto (xrmg)" job posting.
 * Editing this file updates both the careers page and its SEO/JSON-LD.
 */

export const POSITION_SLUG = "assistente-remoto-xrmg";

// ── Jornada ───────────────────────────────────────────────────────────────────
// Início com meio período. Centralizado aqui para editar em um único lugar.
export const HORAS_SEMANAIS = 20;

// ── Remuneração ───────────────────────────────────────────────────────────────
// Exibida na página. "A negociar" mantém o valor aberto para a entrevista.
export const REMUNERACAO = "A negociar (PJ)";

export const VAGA = {
  titulo: "Assistente Remoto(a) — Operações & Automações",
  empresa: "xrmg",
  publicadoVia: "Voxmation",
  local: "100% remoto • Brasil",
  contrato: `PJ • ${HORAS_SEMANAIS} horas semanais (início)`,
  idioma: "Português (nativo)",
  resumo:
    "Procuro uma pessoa que destrave o que me empaca no dia a dia: organizar operações, cuidar de processos e tocar automações. Alguém que pensa rápido, fora da caixa, e aprende ferramentas novas sozinho(a) — sem precisar de manual.",

  responsabilidades: [
    "Destravar tarefas e pendências do dia a dia que travam o negócio.",
    "Organizar e manter processos, planilhas, documentos e o CRM em ordem.",
    "Apoio administrativo e operacional: agenda, follow-ups, e-mails e cobranças.",
    "Criar e manter automações simples (ex.: Make, Zapier, n8n) e usar IA para acelerar tarefas repetitivas.",
    "Pesquisar, comparar e sugerir soluções para problemas que aparecem do nada.",
    "Aprender ferramentas novas rápido e colocá-las para rodar."
  ],

  requisitos: [
    "Pensar rápido e fora da caixa — isso é inegociável.",
    "Aprender rápido e se virar sozinho(a) com ferramentas novas.",
    "Português nativo, ótima comunicação escrita e organização.",
    "Proatividade: identificar o que precisa ser feito antes de ser pedido.",
    "Conhecimento de Google Docs/Sheets ou Word/Excel (planilhas e documentos no dia a dia).",
    "Familiaridade com ferramentas de IA (ChatGPT/Claude) para acelerar tarefas.",
    "Possuir laptop/computador próprio e internet estável para trabalho remoto.",
    `Disponibilidade para ${HORAS_SEMANAIS}h semanais (PJ, com possibilidade de aumentar) e residência no Brasil.`
  ],

  diferenciais: [
    "Experiência com automações no-code (Make, Zapier, n8n).",
    "Já ter usado ferramentas de IA (ChatGPT/Claude) no trabalho.",
    "Vivência com CRM, suporte a clientes ou operações.",
    "Inglês para leitura de documentação.",
    "Ter MEI/empresa aberta para emissão de nota fiscal."
  ],

  condicoes: [
    { label: "Modelo", valor: "100% remoto, em qualquer lugar do Brasil" },
    {
      label: "Contrato",
      valor: `PJ (prestação de serviços), ${HORAS_SEMANAIS}h semanais para início`
    },
    { label: "Remuneração", valor: REMUNERACAO },
    { label: "Avaliação", valor: "Revisão de desempenho a cada 3 meses" },
    { label: "Idioma", valor: "Português nativo" }
  ]
};

// ── Teste de lógica ──────────────────────────────────────────────────────────
// Múltipla escolha com gabarito. Pontua automaticamente para ajudar na triagem.
// O candidato NÃO vê o gabarito; o índice correto fica só aqui.

export interface LogicQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Índice (0-based) da alternativa correta em `options`. */
  correct: number;
}

export const LOGIC_TEST: LogicQuestion[] = [
  {
    id: "logica_sequencia",
    prompt: "Qual é o próximo número da sequência? 2, 6, 12, 20, 30, ___",
    options: ["36", "40", "42", "44"],
    correct: 2 // diferenças 4,6,8,10,12 → 30+12 = 42
  },
  {
    id: "logica_condicional",
    prompt:
      "Regra: “todo pedido acima de R$ 200 ganha frete grátis”. O pedido X tem frete grátis. O que dá para concluir com certeza?",
    options: [
      "O pedido X é, com certeza, acima de R$ 200",
      "O pedido X é, com certeza, abaixo de R$ 200",
      "Não dá para concluir o valor do pedido X só por isso",
      "A regra está errada"
    ],
    correct: 2 // afirmar a consequente não garante a hipótese
  },
  {
    id: "logica_porcentagem",
    prompt:
      "A meta do mês é 80 vendas e já foram feitas 60. Quantos % ainda faltam para bater a meta?",
    options: ["15%", "20%", "25%", "33%"],
    correct: 2 // faltam 20 de 80 = 25%
  },
  {
    id: "logica_proporcao",
    prompt:
      "Uma automação processa 150 cadastros em 30 minutos, num ritmo constante. Quantos cadastros ela processa em 2 horas?",
    options: ["300", "450", "600", "900"],
    correct: 2 // 5/min × 120 min = 600
  },
  {
    id: "logica_deducao",
    prompt:
      "Ana terminou a tarefa antes da Bia. A Carla terminou depois da Bia. Quem terminou por último?",
    options: ["Ana", "Bia", "Carla", "Não dá para saber"],
    correct: 2
  },
  {
    id: "logica_padrao_letras",
    prompt: "Seguindo o padrão, qual letra vem depois? A, C, F, J, ___",
    options: ["M", "N", "O", "P"],
    correct: 2 // saltos +2,+3,+4,+5 → J(10)+5 = O(15)
  },
  {
    id: "logica_fora_do_padrao",
    prompt: "Qual destes valores está fora do padrão da lista? 10, 20, 30, 45, 50",
    options: ["10", "30", "45", "50"],
    correct: 2 // único que não é múltiplo de 10
  },
  {
    id: "logica_codigo",
    prompt:
      "Cada letra vale sua posição no alfabeto (A=1, B=2, C=3, …). Quanto soma a palavra “CAB”?",
    options: ["5", "6", "7", "9"],
    correct: 1 // 3 + 1 + 2 = 6
  }
];

// ── Ferramentas & IA (múltipla escolha, pontuada) ────────────────────────────
// Conhecimentos práticos de Sheets/Excel, Docs/Word e IA. Também auto-pontuado.

export const TOOLS_TEST: LogicQuestion[] = [
  {
    id: "tool_soma",
    prompt: "No Google Sheets/Excel, qual fórmula soma todos os valores do intervalo A1 até A10?",
    options: ["=A1+A10", "=SOMA(A1:A10)  /  =SUM(A1:A10)", "=MÉDIA(A1:A10)", "=TOTAL(A1;A10)"],
    correct: 1
  },
  {
    id: "tool_contse",
    prompt:
      "Você tem a coluna B (B2:B100) com o status de cada pedido. Qual função conta quantas células estão como “Pago”?",
    options: [
      "=SOMA(B2:B100)",
      "=PROCV(B2:B100;\"Pago\")",
      "=CONT.SE(B2:B100;\"Pago\")  /  =COUNTIF(B2:B100;\"Pago\")",
      "=SE(B2:B100=\"Pago\")"
    ],
    correct: 2
  },
  {
    id: "tool_procv",
    prompt: "Para que serve o PROCV / VLOOKUP numa planilha?",
    options: [
      "Buscar um valor numa tabela e trazer a informação correspondente de outra coluna",
      "Somar uma coluna inteira automaticamente",
      "Corrigir a ortografia do texto",
      "Transformar a planilha em PDF"
    ],
    correct: 0
  },
  {
    id: "tool_juntar",
    prompt:
      "Você quer juntar, numa única célula, o nome (A2) e o sobrenome (B2) separados por um espaço. O caminho mais comum é:",
    options: [
      "Apagar uma das colunas",
      "Usar CONCATENAR / & — ex.: =A2&\" \"&B2",
      "Usar PROCV",
      "Mudar a fonte para negrito"
    ],
    correct: 1
  },
  {
    id: "tool_docs",
    prompt:
      "Num documento longo no Google Docs/Word, qual a forma mais rápida e organizada de padronizar TODOS os títulos?",
    options: [
      "Formatar cada título manualmente, um por um",
      "Usar os Estilos (Título 1, Título 2…) e o sumário automático",
      "Tirar print e colar como imagem",
      "Aumentar a fonte de tudo no zoom"
    ],
    correct: 1
  },
  {
    id: "tool_ia",
    prompt:
      "Para a IA (ChatGPT/Claude) entregar a melhor resposta numa tarefa de trabalho, o mais importante é:",
    options: [
      "Escrever o pedido o mais curto possível",
      "Dar contexto claro, exemplos e dizer exatamente o formato que você quer",
      "Repetir a mesma pergunta várias vezes",
      "Usar só letras maiúsculas"
    ],
    correct: 1
  }
];

/**
 * Áreas pontuadas (múltipla escolha com gabarito).
 * Reúne lógica + ferramentas/IA para o cálculo automático da nota.
 */
export const SCORED_AREAS: { id: string; titulo: string; questoes: LogicQuestion[] }[] = [
  { id: "logica", titulo: "Raciocínio lógico", questoes: LOGIC_TEST },
  { id: "ferramentas", titulo: "Ferramentas & IA", questoes: TOOLS_TEST }
];

/**
 * Conta quantas respostas de múltipla escolha (lógica + ferramentas) estão corretas.
 * `answers[q.id]` guarda o TEXTO da alternativa escolhida.
 */
export function scoreTest(answers: Record<string, unknown>): {
  correct: number;
  total: number;
  porArea: { titulo: string; correct: number; total: number }[];
} {
  let correct = 0;
  let total = 0;
  const porArea = SCORED_AREAS.map((area) => {
    let c = 0;
    for (const q of area.questoes) {
      if (answers[q.id] === q.options[q.correct]) c++;
    }
    correct += c;
    total += area.questoes.length;
    return { titulo: area.titulo, correct: c, total: area.questoes.length };
  });
  return { correct, total, porArea };
}

// ── Teste prático (tarefas reais, resposta aberta) ───────────────────────────
// Mostra a mão na massa: planilha, comunicação e automação de verdade.

export const PRACTICAL_TASKS: ScreeningQuestion[] = [
  {
    id: "pratico_planilha",
    type: "longtext",
    label:
      "Tarefa 1 — Planilha: você recebe uma planilha com 500 pedidos (coluna A = valor, coluna B = status “Pago/Pendente”). Precisa somar apenas o valor dos pedidos “Pagos”. Descreva exatamente a fórmula ou os passos que usaria.",
    help: "Pode escrever a fórmula (Sheets ou Excel) ou explicar o passo a passo.",
    required: true,
    maxLength: 600,
    placeholder: "Ex.: =SOMASE(B2:B501;\"Pago\";A2:A501) ..."
  },
  {
    id: "pratico_email",
    type: "longtext",
    label:
      "Tarefa 2 — Comunicação: escreva o texto de um e-mail/mensagem curto e profissional cobrando, com gentileza, um cliente que está 5 dias atrasado no pagamento.",
    help: "Escreva como você mandaria de verdade.",
    required: true,
    maxLength: 800
  },
  {
    id: "pratico_automacao",
    type: "longtext",
    label:
      "Tarefa 3 — Automação: descreva, em passos, como você montaria uma automação (Make/Zapier/n8n ou IA) para: sempre que um formulário novo for preenchido, salvar os dados numa planilha e enviar um WhatsApp de aviso.",
    help: "Não precisa ser perfeito — queremos ver seu raciocínio de automação.",
    required: false,
    maxLength: 800
  }
];

// ── Triagem (perguntas abertas) ──────────────────────────────────────────────
// Mistura de raciocínio rápido, "fora da caixa" e aprender rápido.

export type ScreeningQuestion =
  | {
      id: string;
      type: "longtext";
      label: string;
      help?: string;
      required?: boolean;
      placeholder?: string;
      maxLength?: number;
    }
  | {
      id: string;
      type: "shorttext";
      label: string;
      help?: string;
      required?: boolean;
      placeholder?: string;
    }
  | {
      id: string;
      type: "checkbox";
      label: string;
      help?: string;
      required?: boolean;
      options: string[];
    }
  | {
      id: string;
      type: "select";
      label: string;
      help?: string;
      required?: boolean;
      options: string[];
    };

export const SCREENING: ScreeningQuestion[] = [
  {
    id: "fora_da_caixa",
    type: "longtext",
    label: "Conte uma situação real em que você resolveu um problema de um jeito não óbvio.",
    help: "Queremos ver pensamento fora da caixa. O que era o problema e o que você fez?",
    required: true,
    maxLength: 1200,
    placeholder: "Ex.: O sistema X caiu antes de um prazo, então eu..."
  },
  {
    id: "aprender_rapido",
    type: "longtext",
    label:
      "Você precisa dominar uma ferramenta nova (ex.: uma plataforma de automação) até amanhã, sem ninguém para te ensinar. Como você faz?",
    help: "Conte o seu passo a passo de verdade.",
    required: true,
    maxLength: 1000
  },
  {
    id: "tres_incendios",
    type: "longtext",
    label:
      "Teste rápido: são 14h e você tem 3 urgências ao mesmo tempo — um cliente irritado no WhatsApp, um boleto que vence hoje e uma reunião começando em 5 minutos. O que você faz primeiro e por quê?",
    help: "Responda como reagiria de verdade, sem pensar muito.",
    required: true,
    maxLength: 800
  },
  {
    id: "automatizaria",
    type: "longtext",
    label: "Cite uma tarefa repetitiva que você automatizaria e como faria isso.",
    required: true,
    maxLength: 800
  },
  {
    id: "ferramentas",
    type: "checkbox",
    label: "Com quais ferramentas você já trabalhou?",
    required: false,
    options: [
      "Excel / Google Sheets",
      "Notion",
      "Trello / ClickUp / Asana",
      "Make / Zapier / n8n",
      "CRM (HubSpot, Pipedrive, etc.)",
      "ChatGPT / Claude (IA)",
      "WhatsApp Business / atendimento",
      "Canva / edição básica"
    ]
  },
  {
    id: "ingles",
    type: "select",
    label: "Qual seu nível de inglês?",
    required: true,
    options: ["Não tenho", "Básico (leitura)", "Intermediário", "Avançado / Fluente"]
  },
  {
    id: "disponibilidade",
    type: "select",
    label: `Você tem disponibilidade para ${HORAS_SEMANAIS}h semanais como PJ (com chance de aumentar)?`,
    required: true,
    options: ["Sim, total", "Sim, mas com restrição de horário", "Apenas em alguns dias"]
  },
  {
    id: "porque_voce",
    type: "longtext",
    label: "Por que você é a pessoa certa para destravar o que empaca? (livre)",
    required: false,
    maxLength: 800
  }
];
