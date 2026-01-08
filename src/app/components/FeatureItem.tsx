import { Check } from "lucide-react";

interface FeatureItemProps {
  text: string;
}

export function FeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3">
      <div className="flex-shrink-0 rounded-full bg-lime-400/20 p-1">
        <Check className="size-5 text-lime-400" />
      </div>
      <span className="text-purple-100">{text}</span>
    </li>
  );
}