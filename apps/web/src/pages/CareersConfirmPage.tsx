import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import SEOHead from "../components/SEOHead";

type Status =
  | { kind: "loading" }
  | { kind: "ok"; fullName: string; alreadyConfirmed: boolean }
  | { kind: "error"; message: string };

export default function CareersConfirmPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setStatus({ kind: "error", message: "Link de confirmação inválido." });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/v1/careers/applications/confirm?token=${encodeURIComponent(token)}`
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setStatus({ kind: "error", message: data.error || "Não foi possível confirmar." });
          return;
        }
        setStatus({
          kind: "ok",
          fullName: data.fullName || "",
          alreadyConfirmed: !!data.alreadyConfirmed
        });
      } catch {
        if (!cancelled) setStatus({ kind: "error", message: "Erro de conexão. Tente novamente." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const firstName = status.kind === "ok" ? status.fullName.split(/\s+/)[0] : "";

  return (
    <>
      <SEOHead
        title="Confirmação de candidatura — xrmg"
        description="Confirmação de e-mail da candidatura para a vaga de Assistente Remoto."
        canonical="/carreiras/confirmar"
      />
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-xl mx-auto text-center">
          {status.kind === "loading" && (
            <>
              <Loader2 className="w-12 h-12 text-violet-400 animate-spin mx-auto mb-6" />
              <p className="text-gray-400">Confirmando sua candidatura...</p>
            </>
          )}

          {status.kind === "ok" && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                {status.alreadyConfirmed ? "Já estava confirmada ✅" : "Candidatura confirmada! 🎉"}
              </h1>
              <p className="text-gray-400 leading-relaxed mb-8">
                {firstName ? `Obrigado, ${firstName}! ` : "Obrigado! "}
                Sua inscrição para a vaga de <strong className="text-gray-200">Assistente
                Remoto(a)</strong> está completa. Vamos analisar e entrar em contato pelos próximos
                passos.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar ao início
              </Link>
            </>
          )}

          {status.kind === "error" && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-9 h-9" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Não foi possível confirmar</h1>
              <p className="text-gray-400 leading-relaxed mb-8">{status.message}</p>
              <Link
                to="/carreiras/assistente-remoto"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Ver a vaga novamente
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
