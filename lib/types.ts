export type Option = {
  label: string;
  score: number;
};

export type Question = {
  text: string;
  options: Option[];
};

export type AreaKey =
  | "lucratividade"
  | "controladoria"
  | "financeiro"
  | "processos"
  | "equipe"
  | "marketing";

export type QuizBlock = {
  key: AreaKey;
  label: string;
  subtitle: string;
  questions: Question[];
};

export type RevenueOption = {
  label: string;
  solutionKey: SolutionKey;
};

export type SolutionKey = "curso" | "deliveryclass" | "diagnostico" | "consultoria";

export type Solution = {
  title: string;
  text: string;
};

export type AreaInsight = {
  label: string;
  consequence: string;
  diagnosis: string;
};

export type RoleOption =
  | "Proprietário"
  | "Sócio"
  | "Gerente"
  | "Gestor de Lojas iFood ou 99"
  | "Gestor de tráfego"
  | "Outro";

export type BlockScore = {
  key: AreaKey;
  label: string;
  pct: number;
};

export type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  role: RoleOption | "";
};

export type UtmData = {
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
};
