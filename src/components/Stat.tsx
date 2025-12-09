export const Stat = ({ label, value }: { label: string; value: any }) => (
  <div
    className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm 
                  hover:shadow-md transition-all duration-200 cursor-default"
  >
    <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-1">
      {label}
    </p>
    <p className="text-2xl font-bold text-gray-800">{value ?? "—"}</p>
  </div>
);
