import type { Metadata } from "next";
import { VAGA, HORAS_SEMANAIS } from "@/data/vagaAssistente";
import CareersForm from "./CareersForm";

const description = `Vaga 100% remota no Brasil para assistente de operações e automações. Contrato PJ, ${HORAS_SEMANAIS}h semanais para início. Para quem pensa rápido, fora da caixa e aprende rápido. Candidate-se com currículo e teste de lógica.`;

export const metadata: Metadata = {
  title: "Vaga: Assistente Remoto(a) — Operações & Automações (xrmg)",
  description,
  alternates: { canonical: "/carreiras/assistente-remoto" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Vaga: Assistente Remoto(a) — Operações & Automações (xrmg)",
    description,
    url: "/carreiras/assistente-remoto",
    type: "website"
  }
};

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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />
      <CareersForm />
    </>
  );
}
