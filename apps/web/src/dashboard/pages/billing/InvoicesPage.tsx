import { useEffect, useState } from "react";
import { api, Invoice } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import LoadingSpinner from "../../components/LoadingSpinner";

function formatCents(cents: number): string {
  return "$" + (cents / 100).toFixed(2);
}

export default function InvoicesPage() {
  const [data, setData] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.invoices.list()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Invoices" subtitle="Customer invoices and payment status" />
      <div className="px-0">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="px-8 py-6 text-red-400">{error}</div>
        ) : (
          <Table
            data={data}
            keyFn={(r) => r.id}
            emptyMessage="No invoices found."
            columns={[
              { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-gray-500">{r.id.slice(0, 8)}</span> },
              { key: "account", header: "Account", render: (r) => r.account?.name || r.accountId },
              { key: "plan", header: "Plan", render: (r) => r.plan?.name || <span className="text-gray-600">—</span> },
              { key: "amountCents", header: "Amount", render: (r) => <span className="font-medium">{formatCents(r.amountCents)}</span> },
              { key: "status", header: "Status", render: (r) => <Badge status={r.status} /> },
              { key: "dueAt", header: "Due", render: (r) => r.dueAt ? new Date(r.dueAt).toLocaleDateString() : <span className="text-gray-600">—</span> },
              { key: "paidAt", header: "Paid", render: (r) => r.paidAt ? new Date(r.paidAt).toLocaleDateString() : <span className="text-gray-600">—</span> }
            ]}
          />
        )}
      </div>
    </div>
  );
}
