import { useEffect, useState } from "react";
import { api, ServiceInstance, CreateServiceInstanceInput, Account, ServiceCatalog } from "../../api";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";
import FormField, { inputClass, selectClass } from "../../components/FormField";
import Badge from "../../components/Badge";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function InstancesPage() {
  const [data, setData] = useState<ServiceInstance[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<CreateServiceInstanceInput>({ accountId: "", serviceCatalogId: "", projectName: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    setLoading(true);
    Promise.all([api.serviceInstances.list(), api.accounts.list(), api.serviceCatalog.list()])
      .then(([instances, accs, cats]) => {
        setData(instances);
        setAccounts(accs);
        setCatalogs(cats);
        setForm((f) => ({ ...f, accountId: accs[0]?.id || "", serviceCatalogId: cats[0]?.id || "" }));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accountId) { setFormError("Account is required"); return; }
    if (!form.serviceCatalogId) { setFormError("Service catalog is required"); return; }
    if (!form.projectName.trim()) { setFormError("Project name is required"); return; }
    setFormError("");
    setSubmitting(true);
    try {
      await api.serviceInstances.create(form);
      await load();
      setShowModal(false);
      setForm({ accountId: accounts[0]?.id || "", serviceCatalogId: catalogs[0]?.id || "", projectName: "" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Service Instances"
        subtitle="Active delivery engagements with auto-generated projects"
        action={
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            New Instance
          </button>
        }
      />
      <div className="px-8 py-4">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No service instances yet. Create your first one.</div>
        ) : (
          <div className="space-y-4">
            {data.map((instance) => (
              <div key={instance.id} className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-white">{instance.project?.name || "Unnamed Project"}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {instance.account?.name || instance.accountId} &middot; {instance.catalog?.name || instance.serviceCatalogId}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600">{new Date(instance.createdAt).toLocaleDateString()}</span>
                </div>
                {instance.project && instance.project.tasks.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tasks</p>
                    <div className="space-y-1.5">
                      {instance.project.tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2">
                          <span className="text-sm text-gray-300">{task.title}</span>
                          <div className="flex items-center gap-3">
                            {task.dueAt && (
                              <span className="text-xs text-gray-600">Due {new Date(task.dueAt).toLocaleDateString()}</span>
                            )}
                            <Badge status={task.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {instance.project && instance.project.tasks.length === 0 && (
                  <p className="text-sm text-gray-600">No tasks in this project.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="New Service Instance" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <FormField label="Account" required>
              <select value={form.accountId} onChange={(e) => setForm((f) => ({ ...f, accountId: e.target.value }))} className={selectClass}>
                <option value="">Select account...</option>
                {accounts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </FormField>
            <FormField label="Service Catalog" required>
              <select value={form.serviceCatalogId} onChange={(e) => setForm((f) => ({ ...f, serviceCatalogId: e.target.value }))} className={selectClass}>
                <option value="">Select catalog...</option>
                {catalogs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </FormField>
            <FormField label="Project Name" required>
              <input type="text" value={form.projectName} onChange={(e) => setForm((f) => ({ ...f, projectName: e.target.value }))} placeholder="Onboarding Project" className={inputClass} />
            </FormField>
            {formError && <p className="text-red-400 text-sm mb-3">{formError}</p>}
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowModal(false)} className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-md transition-colors">Cancel</button>
              <button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">{submitting ? "Creating..." : "Create"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
