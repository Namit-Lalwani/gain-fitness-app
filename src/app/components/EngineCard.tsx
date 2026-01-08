import { LucideIcon } from "lucide-react";

interface EngineCardProps {
  icon: LucideIcon;
  tagline: string;
  details: string;
}

export function EngineCard({ icon: Icon, tagline, details }: EngineCardProps) {
  return (
    <div className="group relative rounded-2xl border border-purple-300/20 bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:border-purple-400 hover:-translate-y-1">
      <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-8" />
      </div>
      <h3 className="mb-2 text-xl text-purple-100">{tagline}</h3>
      <p className="text-purple-300 leading-relaxed">{details}</p>
    </div>
  );
}