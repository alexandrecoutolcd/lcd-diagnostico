import { AREA_INSIGHTS } from "@/lib/quiz-data";
import { tierFor } from "@/lib/scoring";
import type { BlockScore } from "@/lib/types";

type Props = {
  firstName: string;
  overall: number;
  maturityText: string;
  blockScores: BlockScore[];
  weakest: BlockScore;
  secondWeakest: BlockScore | null;
  recTitle: string;
  recText: string;
  whatsappHref: string;
};

export default function ResultView({
  firstName,
  overall,
  maturityText,
  blockScores,
  weakest,
  secondWeakest,
  recTitle,
  recText,
  whatsappHref,
}: Props) {
  const insight = AREA_INSIGHTS[weakest.key];
  const secondInsight = secondWeakest ? AREA_INSIGHTS[secondWeakest.key] : null;

  return (
    <div className="df-fadeup">
      <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-brand mb-4">
        Resultado · Diagnóstico LCD
      </span>
      <h2 className="heading text-[32px] sm:text-[44px] leading-[1.02] mb-3">
        {firstName}, aqui está o seu diagnóstico.
      </h2>
      <p className="text-body-secondary text-[14px] leading-relaxed max-w-[520px] mb-8">
        {maturityText}
      </p>

      <div className="card p-6 mb-8">
        <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-muted mb-1">
          Score geral de maturidade
        </span>
        <span className="mono-num block text-[56px] font-black leading-none" style={{ color: "var(--brand)" }}>
          {overall}%
        </span>
      </div>

      <div className="flex flex-col gap-5 mb-8">
        {blockScores.map((b) => {
          const tier = tierFor(b.pct);
          return (
            <div key={b.key}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="heading text-[14px] uppercase tracking-wide">{b.label}</span>
                <span className="text-xs text-muted mono-num">{b.pct}%</span>
              </div>
              <div className="quiz-bar-track">
                <div className={`quiz-bar-fill ${tier}`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ÁREA CRÍTICA */}
      <div className="card p-6 mb-6" style={{ borderColor: "var(--brand)", borderWidth: 1.5 }}>
        <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand mb-3">
          Ponto mais crítico · {insight.label}
        </span>
        <p className="heading text-[18px] sm:text-[22px] leading-snug mb-4">
          {insight.consequence}
        </p>
        <p className="text-body text-[14px] leading-relaxed">{insight.diagnosis}</p>
      </div>

      {secondInsight && secondWeakest && (
        <div className="card p-6 mb-8">
          <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-body-secondary mb-3">
            Também merece atenção · {secondInsight.label}
          </span>
          <p className="text-body text-[14px] leading-relaxed">
            {secondInsight.consequence}
          </p>
        </div>
      )}

      {/* RECOMENDAÇÃO */}
      <div className="border-t border-border pt-8 mb-8">
        <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand mb-3">
          Solução recomendada para você
        </span>
        <h3 className="heading text-[24px] sm:text-[30px] leading-tight mb-3">{recTitle}</h3>
        <p className="text-body-secondary text-[14px] leading-relaxed max-w-[520px]">{recText}</p>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#16a34a] hover:brightness-95 text-white font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded-xl2 transition-all"
      >
        Falar com nosso time no WhatsApp →
      </a>
    </div>
  );
}
