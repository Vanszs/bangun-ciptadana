import { Building2, Home, LayoutGrid, Compass, Layers, Scaling, Paintbrush, Lightbulb, Armchair, Calendar, Briefcase, Smile, UserCheck } from "lucide-react";

const cn = "w-5 h-5 text-brand-secondary";

export function getServiceIcon(name: string) {
  switch (name) {
    case "Building2": return <Building2 className={cn} />;
    case "Home": return <Home className={cn} />;
    case "LayoutGrid": return <LayoutGrid className={cn} />;
    case "Compass": return <Compass className={cn} />;
    case "Layers": return <Layers className={cn} />;
    case "Scaling": return <Scaling className={cn} />;
    case "Paintbrush": return <Paintbrush className={cn} />;
    case "Lightbulb": return <Lightbulb className={cn} />;
    case "Armchair": return <Armchair className={cn} />;
    default: return <Building2 className={cn} />;
  }
}

export function getStatIcon(name: string) {
  switch (name) {
    case "Calendar": return <Calendar className={cn} />;
    case "Briefcase": return <Briefcase className={cn} />;
    case "Smile": return <Smile className={cn} />;
    case "UserCheck": return <UserCheck className={cn} />;
    default: return <UserCheck className={cn} />;
  }
}
