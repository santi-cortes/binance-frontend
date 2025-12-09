export const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="p-4 border rounded-xl bg-white/80 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-semibold">{value ?? "—"}</p>
  </div>
);
