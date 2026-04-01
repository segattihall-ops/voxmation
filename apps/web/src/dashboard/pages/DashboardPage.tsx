import { useEffect, useState } from "react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";

interface Stats {
  accounts: number;
  contacts: number;
  leads: number;
  opportunities: number;
  invoices: number;
  calls: number;
}

function StatCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      {loading ? (
        <div className="h-8 w-16 bg-gray-800 rounded animate-pulse" />
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ accounts: 0, contacts: 0, leads: 0, opportunities: 0, invoices: 0, calls: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.accounts.list(),
      api.contacts.list(),
      api.leads.list(),
      api.opportunities.list(),
      api.invoices.list(),
      api.calls.list()
    ]).then(([accounts, contacts, leads, opportunities, invoices, calls]) => {
      setStats({
        accounts: accounts.status === "fulfilled" ? accounts.value.length : 0,
        contacts: contacts.status === "fulfilled" ? contacts.value.length : 0,
        leads: leads.status === "fulfilled" ? leads.value.length : 0,
        opportunities: opportunities.status === "fulfilled" ? opportunities.value.length : 0,
        invoices: invoices.status === "fulfilled" ? invoices.value.length : 0,
        calls: calls.status === "fulfilled" ? calls.value.length : 0
      });
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your Voxmation OS workspace" />
      <div className="px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Accounts" value={stats.accounts} loading={loading} />
          <StatCard label="Contacts" value={stats.contacts} loading={loading} />
          <StatCard label="Leads" value={stats.leads} loading={loading} />
          <StatCard label="Opportunities" value={stats.opportunities} loading={loading} />
          <StatCard label="Invoices" value={stats.invoices} loading={loading} />
          <StatCard label="Call Logs" value={stats.calls} loading={loading} />
        </div>
      </div>
    </div>
  );
}
