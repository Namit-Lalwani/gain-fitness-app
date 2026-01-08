import { LucideIcon } from "lucide-react";

interface StepCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export function StepCard({ number, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-xl">
        <Icon className="size-10" />
      </div>
      <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-fuchsia-500 text-white text-sm">
        {number}
      </div>
      <h3 className="mb-2 text-xl text-purple-100">{title}</h3>
      <p className="text-purple-300 max-w-xs">{description}</p>
    </div>
  );
}