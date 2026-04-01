import { useEffect, useState } from "react";
import { api, Lead, CreateLeadInput, Account } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import FormField, { inputClass, selectClass } from "../../components/FormField";
import Badge from "../../components/Badge";
import LoadingSpinner from "../../components/LoadingSpinner";

const STATUSES = ["", "NEW", "QUALIFYING", "MEETING", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];
const STATUS_OPTIONS = ["NEW", "QUALIFYING", "MEETING", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];

export default function LeadsPage() {
  const [data, setData] = useState<Lead[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState<Lead | null>(null);
  const [form, setForm] = useState<CreateLeadInput>({});
  const [newStatus, setNewStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    setLoading(true);
    Promise.all([api.leads.list(statusFilter || undefined), api.accounts.list()])
      .then(([leads, accs]) => { setData(leads); setAccounts(accs); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [statusFilter]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const created = await api.leads.create(form);
      setData((d) => [created, ...d]);
      setShowModal(false);
      setForm({});
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusUpdate() {
    if (!statusModal || !newStatus) return;
    setSubmitting(true);
    setFormError("");
    try {
      const updated = await api.leads.updateStatus(statusModal.id, newStatus);
      setData((d) => d.map((l) => (l.id === updated.id ? updated : l)));
      setStatusModal(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle="Prospects moving through your sales pipeline"
        action={
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s || "All statuses"}</option>
              ))}
            </select>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
            >
              New Lead
            </button>
          </div>
        }
      />
      <div className="px-0">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="px-8 py-6 text-red-400">{error}</div>
        ) : (
          <Table
            data={data}
            keyFn={(r) => r.id}
            emptyMessage="No leads found. Create your first lead."
            columns={[
              { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs text-gray-500">{r.id.slice(0, 8)}</span> },
              { key: "status", header: "Status", render: (r) => <Badge status={r.status} /> },
              { key: "source", header: "Source", render: (r) => r.source || <span className="text-gray-600">—</span> },
              { key: "channel", header: "Channel", render: (r) => r.channel || <span className="text-gray-600">—</span> },
              { key: "tags", header: "Tags", render: (r) => r.tags.length > 0 ? r.tags.join(", ") : <span className="text-gray-600">—</span> },
              { key: "createdAt", header: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() },
              { key: "actions", header: "", render: (r) => (
                <button
                  onClick={() => { setStatusModal(r); setNewStatus(r.status); setFormError(""); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Update Status
                </button>
              )}
            ]}
          />
        )}
      </div>

      {showModal && (
        <Modal title="New Lead" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <FormField label="Source">
              <input
                type="text"
                value={form.source || ""}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                placeholder="website, referral, cold_call"
                className={inputClass}
              />
            </FormField>
            <FormField label="Channel">
              <input
                type="text"
                value={form.channel || ""}
                onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))}
                placeholder="email, phone, whatsapp"
                className={inputClass}
              />
            </FormField>
            <FormField label="Account">
              <select
                value={form.accountId || ""}
                onChange={(e) => setForm((f) => ({ ...f, accountId: e.target.value || undefined }))}
                className={selectClass}
              >
                <option value="">No account</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </FormField>
            {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowModal(false)} className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-md transition-colors">Cancel</button>
              <button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {statusModal && (
        <Modal title={`Update Status — Lead ${statusModal.id.slice(0, 8)}`} onClose={() => setStatusModal(null)}>
          <FormField label="New Status">
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className={selectClass}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormField>
          {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setStatusModal(null)} className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-md transition-colors">Cancel</button>
            <button onClick={handleStatusUpdate} disabled={submitting} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
