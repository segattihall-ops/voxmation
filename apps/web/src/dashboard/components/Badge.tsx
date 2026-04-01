import clsx from "clsx";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-900 text-blue-300",
  QUALIFYING: "bg-yellow-900 text-yellow-300",
  MEETING: "bg-purple-900 text-purple-300",
  PROPOSAL: "bg-indigo-900 text-indigo-300",
  NEGOTIATION: "bg-orange-900 text-orange-300",
  WON: "bg-green-900 text-green-300",
  LOST: "bg-red-900 text-red-300",
  PENDING: "bg-yellow-900 text-yellow-300",
  PAID: "bg-green-900 text-green-300",
  OVERDUE: "bg-red-900 text-red-300",
  DRAFT: "bg-gray-800 text-gray-400",
  VOID: "bg-gray-800 text-gray-500",
  STARTED: "bg-blue-900 text-blue-300",
  COMPLETED: "bg-green-900 text-green-300",
  MISSED: "bg-orange-900 text-orange-300",
  FAILED: "bg-red-900 text-red-300",
  TODO: "bg-gray-800 text-gray-400",
  DOING: "bg-blue-900 text-blue-300",
  DONE: "bg-green-900 text-green-300",
  BLOCKED: "bg-red-900 text-red-300",
  ACTIVE: "bg-green-900 text-green-300"
};

interface Props {
  status: string;
}

export default function Badge({ status }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        STATUS_COLORS[status] ?? "bg-gray-800 text-gray-400"
      )}
    >
      {status}
    </span>
  );
}
