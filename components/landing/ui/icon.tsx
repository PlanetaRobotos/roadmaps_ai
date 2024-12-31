import { icons } from 'lucide-react';

export const Icon = ({
  name,
  color,
  size,
  className
}: {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}) => {
  const LucideIcon = icons[name as keyof typeof icons];

  if (!LucideIcon) {
    console.error(
      `Lucide icon "${name}" not found. Please check the icon name.`
    );
    // Optionally, return a fallback UI
    return <span className="text-red-500">Icon Not Found</span>;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
