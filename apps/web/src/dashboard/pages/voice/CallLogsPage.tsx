import { useEffect, useState } from "react";
import { api, CallLog } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import LoadingSpinner from "../../components/LoadingSpinner";

function formatDuration(secs: number): string {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function CallLogsPage() {
  const [data, setData] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.calls.list()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="Call Logs" subtitle="Inbound and outbound call history" />
      <div className="px-0">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="px-8 py-6 text-red-400">{error}</div>
        ) : (
          <Table
            data={data}
            keyFn={(r) => r.id}
            emptyMessage="No call logs found."
            columns={[
              { key: "fromNumber", header: "From", render: (r) => <span className="font-mono text-sm">{r.fromNumber}</span> },
              { key: "toNumber", header: "To", render: (r) => <span className="font-mono text-sm">{r.toNumber}</span> },
              { key: "status", header: "Status", render: (r) => <Badge status={r.status} /> },
              { key: "durationSec", header: "Duration", render: (r) => formatDuration(r.durationSec) },
              { key: "recordingUrl", header: "Recording", render: (r) => r.recordingUrl ? (
                <a href={r.recordingUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-xs">Listen</a>
              ) : <span className="text-gray-600">—</span> },
              { key: "createdAt", header: "Date", render: (r) => new Date(r.createdAt).toLocaleString() }
            ]}
          />
        )}
      </div>
    </div>
  );
}
