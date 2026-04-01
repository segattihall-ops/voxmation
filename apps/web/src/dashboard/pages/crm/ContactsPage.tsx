import { useEffect, useState } from "react";
import { api, Contact, CreateContactInput, Account } from "../../api";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import FormField, { inputClass, selectClass } from "../../components/FormField";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ContactsPage() {
  const [data, setData] = useState<Contact[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CreateContactInput>({ name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    setLoading(true);
    Promise.all([api.contacts.list(), api.accounts.list()])
      .then(([contacts, accs]) => { setData(contacts); setAccounts(accs); })
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
      const created = await api.contacts.create(form);
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
        title="Contacts"
        subtitle="Individual contacts linked to accounts"
        action={
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            New Contact
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
            emptyMessage="No contacts yet. Create your first contact."
            columns={[
              { key: "name", header: "Name", render: (r) => <span className="font-medium text-white">{r.name}</span> },
              { key: "email", header: "Email", render: (r) => r.email || <span className="text-gray-600">—</span> },
              { key: "phone", header: "Phone", render: (r) => r.phone || <span className="text-gray-600">—</span> },
              { key: "account", header: "Account", render: (r) => r.account?.name || <span className="text-gray-600">—</span> },
              { key: "title", header: "Title", render: (r) => r.title || <span className="text-gray-600">—</span> },
              { key: "createdAt", header: "Created", render: (r) => new Date(r.createdAt).toLocaleDateString() }
            ]}
          />
        )}
      </div>

      {showModal && (
        <Modal title="New Contact" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <FormField label="Name" required>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </FormField>
            <FormField label="Email">
              <input
                type="email"
                value={form.email || ""}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="jane@example.com"
                className={inputClass}
              />
            </FormField>
            <FormField label="Phone">
              <input
                type="tel"
                value={form.phone || ""}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+1 555 000 0000"
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
    </div>
  );
}
