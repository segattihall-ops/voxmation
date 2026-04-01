import { useEffect, useState } from "react";
import { api, Account, CreateAccountInput } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import FormField, { inputClass } from "../../components/FormField";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AccountsPage() {
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CreateAccountInput>({ name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    setLoading(true);
    api.accounts.list()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setFormError("Name is required"); return; }
    setFormError("");
    setSubmitting(true);
    try {
      const created = await api.accounts.create(form);
      setData((d) => [created, ...d]);
      setShowModal(false);
      setForm({ name: "" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Accounts"
        subtitle="Companies and organizations in your CRM"
        action={
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            New Account
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
            emptyMessage="No accounts yet. Create your first account."
            columns={[
              { key: "name", header: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "domain", header: "Domain", render: (r) => r.domain || <span className="text-gray-600">—</span> },
              { key: "industry", header: "Industry", render: (r) => r.industry || <span className="text-gray-600">—</span> },
              { key: "size", header: "Size", render: (r) => r.size || <span className="text-gray-600">—</span> },
              { key: "createdAt", header: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() }
            ]}
          />
        )}
      </div>

      {showModal && (
        <Modal title="New Account" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <FormField label="Name" required>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Acme Corp"
                className={inputClass}
              />
            </FormField>
            <FormField label="Domain">
              <input
                type="text"
                value={form.domain || ""}
                onChange={(e) => setForm((f) => ({ ...f, domain: e.target.value }))}
                placeholder="acme.com"
                className={inputClass}
              />
            </FormField>
            <FormField label="Industry">
              <input
                type="text"
                value={form.industry || ""}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                placeholder="Technology"
                className={inputClass}
              />
            </FormField>
            {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
              >
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
