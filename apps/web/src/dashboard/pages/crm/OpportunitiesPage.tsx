import { useEffect, useState } from "react";
import { api, Opportunity, CreateOpportunityInput, Account } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import FormField, { inputClass, selectClass } from "../../components/FormField";
import Badge from "../../components/Badge";
import LoadingSpinner from "../../components/LoadingSpinner";

const STAGES = ["NEW", "QUALIFYING", "MEETING", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];

function formatCents(cents: number): string {
  return "$" + (cents / 100).toFixed(2);
}

export default function OpportunitiesPage() {
  const [data, setData] = useState<Opportunity[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [stageModal, setStageModal] = useState<Opportunity | null>(null);
  const [form, setForm] = useState<CreateOpportunityInput>({ accountId: "", name: "" });
  const [newStage, setNewStage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    setLoading(true);
    Promise.all([api.opportunities.list(), api.accounts.list()])
      .then(([opps, accs]) => { setData(opps); setAccounts(accs); if (accs.length > 0) setForm((f) => ({ ...f, accountId: accs[0].id })); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setFormError("Name is required"); return; }
    if (!form.accountId) { setFormError("Account is required"); return; }
    setFormError("");
    setSubmitting(true);
    try {
      const created = await api.opportunities.create(form);
      setData((d) => [created, ...d]);
      setShowCreate(false);
      setForm({ accountId: accounts[0]?.id || "", name: "" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStageUpdate() {
    if (!stageModal || !newStage) return;
    setSubmitting(true);
    try {
      const updated = await api.opportunities.updateStage(stageModal.id, newStage);
      setData((d) => d.map((o) => (o.id === updated.id ? updated : o)));
      setStageModal(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Opportunities"
        subtitle="Deals in your sales pipeline"
        action={
          <button
            onClick={() => setShowCreate(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            New Opportunity
          </button>
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
            emptyMessage="No opportunities yet. Create your first deal."
            columns={[
              { key: "name", header: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "account", header: "Account", render: (r) => r.account?.name || r.accountId },
              { key: "stage", header: "Stage", render: (r) => <Badge status={r.stage} /> },
              { key: "amountCents", header: "Amount", render: (r) => formatCents(r.amountCents) },
              { key: "probability", header: "Probability", render: (r) => `${r.probability}%` },
              { key: "actions", header: "", render: (r) => (
                <button
                  onClick={() => { setStageModal(r); setNewStage(r.stage); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Update Stage
                </button>
              )}
            ]}
          />
        )}
      </div>

      {showCreate && (
        <Modal title="New Opportunity" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate}>
            <FormField label="Name" required>
              <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Q1 Enterprise Deal" className={inputClass} />
            </FormField>
            <FormField label="Account" required>
              <select value={form.accountId} onChange={(e) => setForm((f) => ({ ...f, accountId: e.target.value }))} className={selectClass}>
                <option value="">Select account...</option>
                {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </FormField>
            <FormField label="Amount (USD)">
              <input type="number" min="0" step="0.01" value={(form.amountCents ?? 0) / 100} onChange={(e) => setForm((f) => ({ ...f, amountCents: Math.round(parseFloat(e.target.value || "0") * 100) }))} placeholder="0.00" className={inputClass} />
            </FormField>
            <FormField label="Probability (%)">
              <input type="number" min="0" max="100" value={form.probability ?? 0} onChange={(e) => setForm((f) => ({ ...f, probability: parseInt(e.target.value || "0") }))} className={inputClass} />
            </FormField>
            {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowCreate(false)} className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-md transition-colors">Cancel</button>
              <button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">{submitting ? "Creating..." : "Create"}</button>
            </div>
          </form>
        </Modal>
      )}

      {stageModal && (
        <Modal title={`Update Stage — ${stageModal.name}`} onClose={() => setStageModal(null)}>
          <FormField label="New Stage">
            <select value={newStage} onChange={(e) => setNewStage(e.target.value)} className={selectClass}>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormField>
          {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setStageModal(null)} className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-md transition-colors">Cancel</button>
            <button onClick={handleStageUpdate} disabled={submitting} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">{submitting ? "Updating..." : "Update"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
