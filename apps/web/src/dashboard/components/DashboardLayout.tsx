import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../api";
import clsx from "clsx";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [{ to: "/app/dashboard", label: "Dashboard" }]
  },
  {
    label: "CRM",
    items: [
      { to: "/app/crm/accounts", label: "Accounts" },
      { to: "/app/crm/contacts", label: "Contacts" },
      { to: "/app/crm/leads", label: "Leads" },
      { to: "/app/crm/opportunities", label: "Opportunities" }
    ]
  },
  {
    label: "Billing",
    items: [
      { to: "/app/billing/plans", label: "Plans" },
      { to: "/app/billing/invoices", label: "Invoices" }
    ]
  },
  {
    label: "Delivery",
    items: [
      { to: "/app/delivery/catalogs", label: "Service Catalogs" },
      { to: "/app/delivery/instances", label: "Service Instances" }
    ]
  },
  {
    label: "Voice",
    items: [{ to: "/app/voice/calls", label: "Call Logs" }]
  }
];

export default function DashboardLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <aside className="w-56 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-800">
          <span className="text-indigo-400 font-bold text-lg tracking-tight">Voxmation OS</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">
                {section.label}
              </p>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center px-3 py-1.5 rounded-md text-sm mb-0.5 transition-colors",
                      isActive
                        ? "bg-indigo-600 text-white font-medium"
                        : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
