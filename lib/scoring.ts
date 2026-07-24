import { QUIZ_DATA } from "./quiz-data";
import type { AreaKey, BlockScore } from "./types";

export function computeBlockScores(answers: (number | null)[][]): BlockScore[] {
  return QUIZ_DATA.map((block, i) => {
    const maxPossible = block.questions.length * 3;
    const sum = (answers[i] || []).reduce((acc: number, v) => acc + (v || 0), 0);
    return {
      key: block.key,
      label: block.label,
      pct: Math.round((sum / maxPossible) * 100),
    };
  });
}

export function computeOverall(blockScores: BlockScore[]): number {
  const total = blockScores.reduce((acc, b) => acc + b.pct, 0);
  return Math.round(total / blockScores.length);
}

export function maturitySubtitle(overall: number): string {
  if (overall <= 40) {
    return "Seu negócio funciona, mas roda muito no improviso. Isso não é falha sua — é falta de estrutura. E estrutura se constrói, ponto por ponto, a partir de agora.";
  }
  if (overall <= 70) {
    return "Você já tem partes da operação organizadas, mas ainda existem lacunas importantes tirando dinheiro e tempo do seu bolso todos os meses.";
  }
  return "Sua base está sólida. Agora o jogo é de precisão: ajustar os pontos específicos que ainda seguram o próximo salto de faturamento.";
}

export function getConsultoriaTitle(weakestKey: AreaKey): string {
  if (weakestKey === "controladoria") return "Consultoria de CMV";
  if (weakestKey === "financeiro") return "Consultoria Financeira";
  if (weakestKey === "lucratividade" || weakestKey === "marketing") return "Consultoria de Vendas";
  return "Consultoria Operacional";
}

export function getWeakestAreas(blockScores: BlockScore[]): {
  weakest: BlockScore;
  secondWeakest: BlockScore | null;
} {
  const sorted = [...blockScores].sort((a, b) => a.pct - b.pct);
  return { weakest: sorted[0], secondWeakest: sorted[1] || null };
}

export function tierFor(pct: number): "weak" | "mid" | "strong" {
  if (pct > 70) return "strong";
  if (pct > 40) return "mid";
  return "weak";
}
