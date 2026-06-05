/**
 * Single source of truth for the "Assistente Remoto (xrmg)" job posting.
 * Editing this file updates both the careers page and its SEO/JSON-LD.
 */

export const POSITION_SLUG = "assistente-remoto-xrmg";

// ── Remuneração ───────────────────────────────────────────────────────────────
// Exibida na página. "A negociar" mantém o valor aberto para a entrevista.
export const REMUNERACAO = "A negociar (PJ)";

export const VAGA = {
  titulo: "Assistente Remoto(a) — Operações & Automações",
  empresa: "xrmg",
  publicadoVia: "Voxmation",
  local: "100% remoto • Brasil",
  contrato: "PJ • 40 horas semanais",
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
    "Disponibilidade para 40h semanais (PJ) e residência no Brasil.",
    "Acesso a computador e internet estáveis para trabalho remoto."
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
    { label: "Contrato", valor: "PJ (prestação de serviços), 40h semanais" },
    { label: "Remuneração", valor: REMUNERACAO },
    { label: "Avaliação", valor: "Revisão de desempenho a cada 3 meses" },
    { label: "Idioma", valor: "Português nativo" }
  ]
};

// ── Teste / Triagem ──────────────────────────────────────────────────────────
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
    label: "Você tem disponibilidade para 40h semanais como PJ?",
    required: true,
    options: ["Sim, total", "Sim, mas com restrição de horário", "Apenas meio período"]
  },
  {
    id: "pretensao",
    type: "shorttext",
    label: "Qual sua pretensão de remuneração mensal (PJ)?",
    required: true,
    placeholder: "Ex.: R$ 3.500"
  },
  {
    id: "porque_voce",
    type: "longtext",
    label: "Por que você é a pessoa certa para destravar o que empaca? (livre)",
    required: false,
    maxLength: 800
  }
];
