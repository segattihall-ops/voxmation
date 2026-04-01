import { useEffect, useState } from "react";
import { api, ServiceCatalog } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function CatalogsPage() {
  const [data, setData] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.serviceCatalog.list()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Service Catalogs" subtitle="Reusable service templates for delivery projects" />
      <div className="px-0">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="px-8 py-6 text-red-400">{error}</div>
        ) : (
          <Table
            data={data}
            keyFn={(r) => r.id}
            emptyMessage="No service catalogs configured."
            columns={[
              { key: "name", header: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "description", header: "Description", render: (r) => r.description || <span className="text-gray-600">—</span> },
              { key: "template", header: "Template", render: (r) => (
                <span className="font-mono text-xs text-gray-500">
                  {JSON.stringify(r.template).slice(0, 60)}{JSON.stringify(r.template).length > 60 ? "..." : ""}
                </span>
              )},
              { key: "createdAt", header: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() }
            ]}
          />
        )}
      </div>
    </div>
  );
}
