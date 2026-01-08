interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-2 bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-purple-200">{label}</div>
    </div>
  );
}