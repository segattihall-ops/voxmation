import { useEffect, useState } from "react";
import { api, Plan } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import LoadingSpinner from "../../components/LoadingSpinner";

function formatCents(cents: number): string {
  return "$" + (cents / 100).toFixed(2);
}

export default function PlansPage() {
  const [data, setData] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.plans.list()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Plans" subtitle="Subscription plans available in your system" />
      <div className="px-0">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="px-8 py-6 text-red-400">{error}</div>
        ) : (
          <Table
            data={data}
            keyFn={(r) => r.id}
            emptyMessage="No plans configured."
            columns={[
              { key: "name", header: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "priceCents", header: "Price", render: (r) => formatCents(r.priceCents) },
              { key: "interval", header: "Interval", render: (r) => <span className="capitalize">{r.interval}</span> },
              { key: "createdAt", header: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() }
            ]}
          />
        )}
      </div>
    </div>
  );
}
