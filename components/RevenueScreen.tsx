import OptionButton from "./OptionButton";
import type { RevenueOption } from "@/lib/types";

type Props = {
  options: RevenueOption[];
  onSelect: (opt: RevenueOption) => void;
  onBack: () => void;
};

export default function RevenueScreen({ options, onSelect, onBack }: Props) {
  return (
    <div className="df-fadeup">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-muted hover:text-brand mb-4 transition-colors"
      >
        ← Voltar
      </button>
      <span className="block text-xs font-bold tracking-[0.18em] uppercase text-brand mb-2">
        Última pergunta
      </span>
      <h2 className="heading text-[22px] sm:text-[28px] leading-snug mb-8 max-w-[560px]">
        Qual é o faturamento mensal médio do seu negócio hoje?
      </h2>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <OptionButton key={opt.label} index={i} label={opt.label} onClick={() => onSelect(opt)} />
        ))}
      </div>
    </div>
  );
}
