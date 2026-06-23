export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
}

export interface CompanyStat {
  id: string;
  value: string;
  label: string;
  iconName: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}
