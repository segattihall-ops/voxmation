const BASE = "";

function getToken(): string | null {
  return localStorage.getItem("vox_token");
}

export function clearToken() {
  localStorage.removeItem("vox_token");
}

export function setToken(token: string) {
  localStorage.setItem("vox_token", token);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(BASE + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 401) {
    clearToken();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string }>("POST", "/auth/login", { email, password }),
    register: (email: string, password: string, name?: string, role?: string) =>
      request<{ id: string; email: string; role: string }>("POST", "/auth/register", { email, password, name, role })
  },
  accounts: {
    list: () => request<Account[]>("GET", "/v1/accounts"),
    create: (data: CreateAccountInput) => request<Account>("POST", "/v1/accounts", data)
  },
  contacts: {
    list: () => request<Contact[]>("GET", "/v1/contacts"),
    create: (data: CreateContactInput) => request<Contact>("POST", "/v1/contacts", data)
  },
  leads: {
    list: (status?: string) => request<Lead[]>("GET", `/v1/leads${status ? `?status=${status}` : ""}`),
    create: (data: CreateLeadInput) => request<Lead>("POST", "/v1/leads", data),
    updateStatus: (id: string, status: string) =>
      request<Lead>("PUT", `/v1/leads/${id}/status`, { status })
  },
  opportunities: {
    list: () => request<Opportunity[]>("GET", "/v1/opportunities"),
    create: (data: CreateOpportunityInput) => request<Opportunity>("POST", "/v1/opportunities", data),
    updateStage: (id: string, stage: string) =>
      request<Opportunity>("PUT", `/v1/opportunities/${id}/stage`, { stage })
  },
  plans: {
    list: () => request<Plan[]>("GET", "/v1/plans")
  },
  invoices: {
    list: () => request<Invoice[]>("GET", "/v1/invoices")
  },
  serviceCatalog: {
    list: () => request<ServiceCatalog[]>("GET", "/v1/service-catalog")
  },
  serviceInstances: {
    list: () => request<ServiceInstance[]>("GET", "/v1/service-instances"),
    create: (data: CreateServiceInstanceInput) =>
      request<ServiceInstance>("POST", "/v1/service-instances", data)
  },
  calls: {
    list: () => request<CallLog[]>("GET", "/v1/calls")
  }
};

export interface Account {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  size?: string;
  notes?: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  accountId?: string;
  account?: { name: string };
  title?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  status: string;
  source?: string;
  channel?: string;
  tags: string[];
  accountId?: string;
  contactId?: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  account?: { name: string };
  amountCents: number;
  probability: number;
  stage: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  priceCents: number;
  interval: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  accountId: string;
  account?: { name: string };
  planId?: string;
  plan?: { name: string };
  amountCents: number;
  status: string;
  dueAt?: string;
  paidAt?: string;
  createdAt: string;
}

export interface ServiceCatalog {
  id: string;
  name: string;
  description?: string;
  template: unknown;
  createdAt: string;
}

export interface ServiceInstance {
  id: string;
  accountId: string;
  account?: { name: string };
  serviceCatalogId: string;
  catalog?: { name: string };
  project?: {
    id: string;
    name: string;
    tasks: Task[];
  };
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  dueAt?: string;
}

export interface CallLog {
  id: string;
  fromNumber: string;
  toNumber: string;
  status: string;
  durationSec: number;
  recordingUrl?: string;
  transcript?: string;
  accountId?: string;
  leadId?: string;
  opportunityId?: string;
  createdAt: string;
}

export interface CreateAccountInput {
  name: string;
  domain?: string;
  industry?: string;
}

export interface CreateContactInput {
  name: string;
  email?: string;
  phone?: string;
  accountId?: string;
}

export interface CreateLeadInput {
  accountId?: string;
  contactId?: string;
  source?: string;
  channel?: string;
}

export interface CreateOpportunityInput {
  accountId: string;
  name: string;
  amountCents?: number;
  probability?: number;
}

export interface CreateServiceInstanceInput {
  accountId: string;
  serviceCatalogId: string;
  projectName: string;
}
