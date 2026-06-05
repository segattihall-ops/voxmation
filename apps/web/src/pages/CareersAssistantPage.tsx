import { useState } from "react";
import {
  MapPin,
  Briefcase,
  Languages,
  CalendarClock,
  Wallet,
  CheckCircle2,
  Upload,
  FileText,
  ArrowRight,
  ArrowLeft,
  Zap,
  Brain,
  Sparkles,
  Loader2,
  X,
  Mail
} from "lucide-react";
import clsx from "clsx";
import SEOHead from "../components/SEOHead";
import {
  VAGA,
  SCREENING,
  LOGIC_TEST,
  TOOLS_TEST,
  PRACTICAL_TASKS,
  scoreTest,
  HORAS_SEMANAIS,
  POSITION_SLUG,
  type ScreeningQuestion,
  type LogicQuestion
} from "../careers/vagaAssistente";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_RESUME = ".pdf,.doc,.docx";

type AnswerValue = string | string[];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedin: string;
  portfolio: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const STEPS = ["Sobre você", "Currículo", "Teste", "Revisão"];

const condicaoIcon: Record<string, JSX.Element> = {
  Modelo: <MapPin className="w-4 h-4" />,
  Contrato: <Briefcase className="w-4 h-4" />,
  Remuneração: <Wallet className="w-4 h-4" />,
  Avaliação: <CalendarClock className="w-4 h-4" />,
  Idioma: <Languages className="w-4 h-4" />
};

export default function CareersAssistantPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    linkedin: "",
    portfolio: ""
  });
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | { emailDelivered: boolean; confirmUrl?: string }>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setAnswer(id: string, value: AnswerValue) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  function toggleCheckbox(id: string, option: string) {
    setAnswers((a) => {
      const current = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...a, [id]: next };
    });
  }

  function onResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_RESUME_BYTES) {
      setError("O currículo deve ter no máximo 5MB.");
      return;
    }
    setError(null);
    setResumeFile(file);
  }

  function validateStep(current: number): string | null {
    if (current === 0) {
      if (form.fullName.trim().length < 2) return "Informe seu nome completo.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Informe um e-mail válido.";
      const sal = answers.pretensao;
      if (!sal || (typeof sal === "string" && !sal.trim()))
        return "Informe sua pretensão salarial.";
    }
    if (current === 2) {
      // Áreas pontuadas: todas as alternativas devem ser respondidas.
      for (const q of [...LOGIC_TEST, ...TOOLS_TEST]) {
        const v = answers[q.id];
        if (!v || (typeof v === "string" && !v.trim()))
          return "Responda todas as questões de múltipla escolha do teste.";
      }
      // Teste prático + perguntas situacionais obrigatórias.
      for (const q of [...PRACTICAL_TASKS, ...SCREENING]) {
        if (!q.required) continue;
        const v = answers[q.id];
        if (q.type === "checkbox") {
          if (!Array.isArray(v) || v.length === 0) return `Responda: "${q.label}"`;
        } else if (!v || (typeof v === "string" && !v.trim())) {
          return `Responda: "${q.label}"`;
        }
      }
    }
    return null;
  }

  function next() {
    const v = validateStep(step);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    if (!consent) {
      setError("É necessário aceitar o uso dos seus dados (LGPD) para enviar.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      let resume: { filename: string; mimeType: string; base64: string } | undefined;
      if (resumeFile) {
        const base64 = await fileToBase64(resumeFile);
        resume = {
          filename: resumeFile.name,
          mimeType: resumeFile.type || "application/octet-stream",
          base64
        };
      }

      // Calcula a nota do teste de múltipla escolha e anexa às respostas,
      // para a triagem ver a pontuação sem precisar corrigir manualmente.
      const score = scoreTest(answers);
      const answersWithScore: Record<string, AnswerValue> = {
        ...answers,
        _nota_teste: `${score.correct}/${score.total}`,
        ...Object.fromEntries(
          score.porArea.map((a) => [`_nota_${a.titulo}`, `${a.correct}/${a.total}`])
        )
      };

      const res = await fetch("/v1/careers/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: POSITION_SLUG,
          ...form,
          resume,
          answers: answersWithScore,
          consentLgpd: consent,
          confirmBaseUrl: window.location.origin
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível enviar sua candidatura.");
      }

      const data = await res.json();
      setDone({ emailDelivered: !!data.emailDelivered, confirmUrl: data.confirmUrl });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  const jobLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: VAGA.titulo,
    description: VAGA.resumo,
    employmentType: "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: "xrmg" },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "Brazil" },
    directApply: true
  };

  return (
    <>
      <SEOHead
        title="Vaga: Assistente Remoto(a) — Operações & Automações (xrmg)"
        description={`Vaga 100% remota no Brasil para assistente de operações e automações. Contrato PJ, ${HORAS_SEMANAIS}h semanais para início. Para quem pensa rápido, fora da caixa e aprende rápido. Candidate-se com currículo e teste de lógica.`}
        canonical="/carreiras/assistente-remoto"
        jsonLd={jobLd}
      />

      {/* Co-branding band */}
      <div className="border-b border-gray-800/60 bg-gray-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-3 text-sm">
          <span className="font-bold text-white tracking-tight">xrmg</span>
          <span className="text-gray-600">vaga publicada via</span>
          <span className="font-semibold text-violet-300">Voxmation</span>
        </div>
      </div>

      {done ? (
        <SuccessPanel done={done} email={form.email} />
      ) : (
        <>
          {/* Hero */}
          <section className="pt-14 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-5">
                <Sparkles className="w-3.5 h-3.5" /> Estamos contratando
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                {VAGA.titulo}
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-6">{VAGA.resumo}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Chip icon={<MapPin className="w-4 h-4" />} text={VAGA.local} />
                <Chip icon={<Briefcase className="w-4 h-4" />} text={VAGA.contrato} />
                <Chip icon={<Languages className="w-4 h-4" />} text={VAGA.idioma} />
              </div>
              <a
                href="#candidatar"
                className="inline-flex items-center gap-2 mt-7 px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-violet-900/30"
              >
                Quero me candidatar <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* Highlight: o que não abrimos mão */}
          <section className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
              <Highlight
                icon={<Brain className="w-5 h-5" />}
                title="Pensa fora da caixa"
                text="Resolve o não óbvio. Esse ponto é inegociável."
              />
              <Highlight
                icon={<Zap className="w-5 h-5" />}
                title="Aprende rápido"
                text="Pega ferramenta nova e coloca para rodar sozinho(a)."
              />
              <Highlight
                icon={<CheckCircle2 className="w-5 h-5" />}
                title="Destrava o que empaca"
                text="Proatividade para resolver antes de ser pedido."
              />
            </div>
          </section>

          {/* Detalhes da vaga */}
          <section className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ListBlock title="O que você vai fazer" items={VAGA.responsabilidades} />
                <ListBlock title="O que buscamos" items={VAGA.requisitos} />
                <ListBlock title="Diferenciais (não obrigatórios)" items={VAGA.diferenciais} muted />
              </div>
              <aside className="lg:col-span-1">
                <div className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 sticky top-24">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                    Condições
                  </h3>
                  <ul className="space-y-4">
                    {VAGA.condicoes.map((c) => (
                      <li key={c.label} className="flex gap-3">
                        <span className="text-violet-400 mt-0.5">
                          {condicaoIcon[c.label] ?? <CheckCircle2 className="w-4 h-4" />}
                        </span>
                        <div>
                          <p className="text-xs text-gray-500">{c.label}</p>
                          <p className="text-sm text-gray-200 font-medium">{c.valor}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </section>

          {/* Formulário */}
          <section id="candidatar" className="px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Candidate-se</h2>
              <p className="text-gray-500 mb-8">
                Leva uns 10 minutos. Você vai receber um e-mail para confirmar sua inscrição.
              </p>

              {/* Stepper */}
              <div className="flex items-center justify-between mb-8">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={clsx(
                          "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                          i < step && "bg-violet-600 text-white",
                          i === step && "bg-violet-500/20 text-violet-300 border-2 border-violet-500",
                          i > step && "bg-gray-800 text-gray-500"
                        )}
                      >
                        {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                      </div>
                      <span
                        className={clsx(
                          "mt-2 text-xs hidden sm:block",
                          i <= step ? "text-gray-300" : "text-gray-600"
                        )}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={clsx(
                          "h-0.5 flex-1 mx-2 transition-colors",
                          i < step ? "bg-violet-600" : "bg-gray-800"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-6 flex items-start gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 sm:p-8">
                {step === 0 && (
                  <div className="space-y-5">
                    <Field label="Nome completo *">
                      <input
                        className={inputCls}
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Seu nome"
                      />
                    </Field>
                    <Field label="E-mail *">
                      <input
                        type="email"
                        className={inputCls}
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="voce@email.com"
                      />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="WhatsApp / Telefone">
                        <input
                          className={inputCls}
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </Field>
                      <Field label="Estado (UF)">
                        <input
                          className={inputCls}
                          value={form.state}
                          onChange={(e) => update("state", e.target.value)}
                          placeholder="SP"
                          maxLength={2}
                        />
                      </Field>
                    </div>
                    <Field label="Cidade">
                      <input
                        className={inputCls}
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        placeholder="Sua cidade"
                      />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="LinkedIn (opcional)">
                        <input
                          className={inputCls}
                          value={form.linkedin}
                          onChange={(e) => update("linkedin", e.target.value)}
                          placeholder="linkedin.com/in/voce"
                        />
                      </Field>
                      <Field label="Portfólio / site (opcional)">
                        <input
                          className={inputCls}
                          value={form.portfolio}
                          onChange={(e) => update("portfolio", e.target.value)}
                          placeholder="https://..."
                        />
                      </Field>
                    </div>
                    <Field label="Pretensão salarial (PJ, por mês) *">
                      <input
                        className={inputCls}
                        value={(answers.pretensao as string) || ""}
                        onChange={(e) => setAnswer("pretensao", e.target.value)}
                        placeholder="Ex.: R$ 2.500 / mês"
                        inputMode="numeric"
                      />
                      <span className="block text-xs text-gray-500 mt-2">
                        Início com {HORAS_SEMANAIS}h semanais (PJ). Pode informar um valor ou uma
                        faixa — a remuneração é a combinar.
                      </span>
                    </Field>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <Field label="Currículo (PDF ou Word, até 5MB)">
                      <label
                        className={clsx(
                          "flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-colors",
                          resumeFile
                            ? "border-violet-500/50 bg-violet-500/5"
                            : "border-gray-700 hover:border-gray-600 bg-gray-900/30"
                        )}
                      >
                        {resumeFile ? (
                          <>
                            <FileText className="w-8 h-8 text-violet-400" />
                            <span className="text-sm text-gray-200 font-medium">{resumeFile.name}</span>
                            <span className="text-xs text-gray-500">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB — clique para trocar
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-500" />
                            <span className="text-sm text-gray-400">
                              Clique para enviar seu currículo
                            </span>
                            <span className="text-xs text-gray-600">PDF, DOC ou DOCX</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept={ACCEPTED_RESUME}
                          className="hidden"
                          onChange={onResumeChange}
                        />
                      </label>
                    </Field>
                    <p className="text-xs text-gray-600 mt-3">
                      O currículo é opcional, mas recomendado. Você pode seguir sem anexar.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-10">
                    <p className="text-sm text-gray-500 -mt-1">
                      O teste é dividido por áreas. As de múltipla escolha têm resposta certa; as
                      demais não — queremos ver como você pensa. Leva uns 10 minutos.
                    </p>

                    <TestArea
                      n={1}
                      titulo="Raciocínio lógico"
                      descricao="Múltipla escolha. Escolha a melhor alternativa."
                      icon={<Brain className="w-4 h-4" />}
                    >
                      {LOGIC_TEST.map((q, i) => (
                        <ChoiceField
                          key={q.id}
                          n={i + 1}
                          q={q}
                          value={answers[q.id] as string | undefined}
                          onPick={(v) => setAnswer(q.id, v)}
                        />
                      ))}
                    </TestArea>

                    <TestArea
                      n={2}
                      titulo="Ferramentas & IA"
                      descricao="Planilhas (Sheets/Excel), documentos (Docs/Word) e IA."
                      icon={<Zap className="w-4 h-4" />}
                    >
                      {TOOLS_TEST.map((q, i) => (
                        <ChoiceField
                          key={q.id}
                          n={i + 1}
                          q={q}
                          value={answers[q.id] as string | undefined}
                          onPick={(v) => setAnswer(q.id, v)}
                        />
                      ))}
                    </TestArea>

                    <TestArea
                      n={3}
                      titulo="Teste prático"
                      descricao="Mão na massa — responda como faria de verdade."
                      icon={<FileText className="w-4 h-4" />}
                    >
                      {PRACTICAL_TASKS.map((q) => (
                        <QuestionField
                          key={q.id}
                          q={q}
                          value={answers[q.id]}
                          onText={(v) => setAnswer(q.id, v)}
                          onToggle={(opt) => toggleCheckbox(q.id, opt)}
                        />
                      ))}
                    </TestArea>

                    <TestArea
                      n={4}
                      titulo="Sobre você (situacional)"
                      descricao="Sem certo ou errado. Seja direto(a)."
                      icon={<Sparkles className="w-4 h-4" />}
                    >
                      {SCREENING.map((q) => (
                        <QuestionField
                          key={q.id}
                          q={q}
                          value={answers[q.id]}
                          onText={(v) => setAnswer(q.id, v)}
                          onToggle={(opt) => toggleCheckbox(q.id, opt)}
                        />
                      ))}
                    </TestArea>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white">Revise antes de enviar</h3>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <Review label="Nome" value={form.fullName} />
                      <Review label="E-mail" value={form.email} />
                      <Review label="Telefone" value={form.phone || "—"} />
                      <Review
                        label="Local"
                        value={[form.city, form.state].filter(Boolean).join(" / ") || "—"}
                      />
                      <Review
                        label="Pretensão salarial"
                        value={(answers.pretensao as string) || "—"}
                      />
                      <Review label="Currículo" value={resumeFile?.name || "Não anexado"} />
                      <Review
                        label="Teste (múltipla escolha)"
                        value={(() => {
                          const s = scoreTest(answers);
                          return `${s.correct}/${s.total} corretas`;
                        })()}
                      />
                    </div>

                    <label className="flex items-start gap-3 p-4 rounded-lg bg-gray-900/40 border border-gray-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-violet-600"
                      />
                      <span className="text-sm text-gray-400 leading-relaxed">
                        Autorizo o uso dos meus dados para fins deste processo seletivo, conforme a
                        LGPD. Entendo que receberei um e-mail para confirmar minha candidatura.
                      </span>
                    </label>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800/60">
                  {step > 0 ? (
                    <button
                      onClick={back}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={next}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                        </>
                      ) : (
                        <>
                          Enviar candidatura <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

/* ── Subcomponents ──────────────────────────────────────────────────────────── */

const inputCls =
  "w-full px-4 py-2.5 rounded-lg bg-gray-900/60 border border-gray-700 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-300 mb-2">{label}</span>
      {children}
    </label>
  );
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700/60 text-gray-300">
      <span className="text-violet-400">{icon}</span>
      {text}
    </span>
  );
}

function Highlight({
  icon,
  title,
  text
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-xl p-5">
      <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}

function ListBlock({
  title,
  items,
  muted
}: {
  title: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2
              className={clsx(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                muted ? "text-gray-600" : "text-violet-400"
              )}
            />
            <span className="text-gray-400 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-gray-200">{value}</p>
    </div>
  );
}

function TestArea({
  n,
  titulo,
  descricao,
  icon,
  children
}: {
  n: number;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-800/60">
        <span className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </span>
        <div>
          <h3 className="text-white font-semibold leading-tight">
            Área {n} — {titulo}
          </h3>
          <p className="text-xs text-gray-500">{descricao}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ChoiceField({
  n,
  q,
  value,
  onPick
}: {
  n: number;
  q: LogicQuestion;
  value: string | undefined;
  onPick: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-200 mb-2">
        {n}. {q.prompt}
        <span className="text-violet-400"> *</span>
      </p>
      <div className="space-y-2">
        {q.options.map((o) => {
          const checked = value === o;
          return (
            <label
              key={o}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer text-sm transition-colors",
                checked
                  ? "border-violet-500/50 bg-violet-500/10 text-gray-100"
                  : "border-gray-700 bg-gray-900/40 text-gray-400 hover:border-gray-600"
              )}
            >
              <input
                type="radio"
                name={q.id}
                checked={checked}
                onChange={() => onPick(o)}
                className="w-4 h-4 accent-violet-600"
              />
              {o}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function QuestionField({
  q,
  value,
  onText,
  onToggle
}: {
  q: ScreeningQuestion;
  value: AnswerValue | undefined;
  onText: (v: string) => void;
  onToggle: (opt: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-200 mb-1">
        {q.label}
        {q.required && <span className="text-violet-400"> *</span>}
      </p>
      {"help" in q && q.help && <p className="text-xs text-gray-500 mb-2">{q.help}</p>}

      {q.type === "longtext" && (
        <textarea
          rows={4}
          maxLength={q.maxLength}
          className={inputCls + " resize-y"}
          placeholder={q.placeholder}
          value={(value as string) || ""}
          onChange={(e) => onText(e.target.value)}
        />
      )}

      {q.type === "shorttext" && (
        <input
          className={inputCls}
          placeholder={q.placeholder}
          value={(value as string) || ""}
          onChange={(e) => onText(e.target.value)}
        />
      )}

      {q.type === "select" && (
        <select
          className={inputCls}
          value={(value as string) || ""}
          onChange={(e) => onText(e.target.value)}
        >
          <option value="">Selecione...</option>
          {q.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {q.type === "checkbox" && (
        <div className="grid sm:grid-cols-2 gap-2 mt-1">
          {q.options.map((o) => {
            const checked = Array.isArray(value) && value.includes(o);
            return (
              <label
                key={o}
                className={clsx(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer text-sm transition-colors",
                  checked
                    ? "border-violet-500/50 bg-violet-500/10 text-gray-100"
                    : "border-gray-700 bg-gray-900/40 text-gray-400 hover:border-gray-600"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(o)}
                  className="w-4 h-4 accent-violet-600"
                />
                {o}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SuccessPanel({
  done,
  email
}: {
  done: { emailDelivered: boolean; confirmUrl?: string };
  email: string;
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-violet-500/15 text-violet-400 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Candidatura recebida! 🎉</h1>
        <p className="text-gray-400 leading-relaxed mb-2">
          Enviamos um e-mail de confirmação para <strong className="text-gray-200">{email}</strong>.
        </p>
        <p className="text-gray-400 leading-relaxed mb-8">
          Abra o e-mail e clique em <strong className="text-gray-200">“Confirmar minha
          candidatura”</strong> para finalizar. Confira também a caixa de spam.
        </p>

        {!done.emailDelivered && done.confirmUrl && (
          <div className="text-left p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
            <p className="font-semibold mb-1">Modo de desenvolvimento</p>
            <p className="mb-2 text-amber-200/80">
              Nenhum provedor de e-mail configurado. Use este link para confirmar:
            </p>
            <a href={done.confirmUrl} className="text-amber-300 underline break-all">
              {done.confirmUrl}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
