interface Props {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}

export default function FormField({ label, required, children, error }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export const inputClass =
  "w-full bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-600";

export const selectClass =
  "w-full bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500";
