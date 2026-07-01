import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import MissedCallRecoveryPage from "./pages/MissedCallRecoveryPage";
import VsSmithAiPage from "./pages/VsSmithAiPage";
import VsGoodcallPage from "./pages/VsGoodcallPage";
import VsNextphonePage from "./pages/VsNextphonePage";
import CareersAssistantPage from "./pages/CareersAssistantPage";
import CareersConfirmPage from "./pages/CareersConfirmPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./dashboard/pages/LoginPage";
import RegisterPage from "./dashboard/pages/RegisterPage";
import DashboardLayout from "./dashboard/components/DashboardLayout";
import ProtectedRoute from "./dashboard/components/ProtectedRoute";
import DashboardPage from "./dashboard/pages/DashboardPage";
import AccountsPage from "./dashboard/pages/crm/AccountsPage";
import ContactsPage from "./dashboard/pages/crm/ContactsPage";
import LeadsPage from "./dashboard/pages/crm/LeadsPage";
import OpportunitiesPage from "./dashboard/pages/crm/OpportunitiesPage";
import PlansPage from "./dashboard/pages/billing/PlansPage";
import InvoicesPage from "./dashboard/pages/billing/InvoicesPage";
import CatalogsPage from "./dashboard/pages/delivery/CatalogsPage";
import InstancesPage from "./dashboard/pages/delivery/InstancesPage";
import CallLogsPage from "./dashboard/pages/voice/CallLogsPage";

// Marketing routes that are statically prerendered at build time.
// Keep in sync with the prerender script (scripts/prerender.mjs).
export const PRERENDER_ROUTES = [
  "/",
  "/how-it-works",
  "/features",
  "/missed-call-recovery",
  "/pricing",
  "/faq",
  "/vs-smith-ai",
  "/vs-goodcall",
  "/vs-nextphone",
  "/blog",
  "/carreiras/assistente-remoto",
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="crm/accounts" element={<AccountsPage />} />
        <Route path="crm/contacts" element={<ContactsPage />} />
        <Route path="crm/leads" element={<LeadsPage />} />
        <Route path="crm/opportunities" element={<OpportunitiesPage />} />
        <Route path="billing/plans" element={<PlansPage />} />
        <Route path="billing/invoices" element={<InvoicesPage />} />
        <Route path="delivery/catalogs" element={<CatalogsPage />} />
        <Route path="delivery/instances" element={<InstancesPage />} />
        <Route path="voice/calls" element={<CallLogsPage />} />
      </Route>

      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="missed-call-recovery" element={<MissedCallRecoveryPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="vs-smith-ai" element={<VsSmithAiPage />} />
        <Route path="vs-goodcall" element={<VsGoodcallPage />} />
        <Route path="vs-nextphone" element={<VsNextphonePage />} />
        {/* Legacy CRM-era comparison URLs — redirect to avoid 404s */}
        <Route path="vs-hubspot" element={<Navigate to="/vs-smith-ai" replace />} />
        <Route path="vs-salesforce" element={<Navigate to="/vs-smith-ai" replace />} />
        <Route path="vs-zoho" element={<Navigate to="/vs-goodcall" replace />} />
        <Route path="carreiras/assistente-remoto" element={<CareersAssistantPage />} />
        <Route path="carreiras/confirmar" element={<CareersConfirmPage />} />
        <Route path="vaga" element={<Navigate to="/carreiras/assistente-remoto" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
