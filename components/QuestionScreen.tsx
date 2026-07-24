import OptionButton from "./OptionButton";
import type { QuizBlock } from "@/lib/types";

type Props = {
  block: QuizBlock;
  blockIndex: number;
  totalBlocks: number;
  questionText: string;
  onSelect: (score: number) => void;
  onBack: () => void;
  canGoBack: boolean;
  options: { label: string; score: number }[];
};

export default function QuestionScreen({
  block,
  blockIndex,
  totalBlocks,
  questionText,
  onSelect,
  onBack,
  canGoBack,
  options,
}: Props) {
  return (
    <div className="df-fadeup" key={questionText}>
      {canGoBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-muted hover:text-brand mb-4 transition-colors"
        >
          ← Voltar
        </button>
      )}
      <span className="block text-xs font-bold tracking-[0.18em] uppercase text-brand mb-2">
        Área {blockIndex + 1} de {totalBlocks} · {block.label}
      </span>
      <h2 className="heading text-[22px] sm:text-[28px] leading-snug mb-8 max-w-[560px]">
        {questionText}
      </h2>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <OptionButton key={i} index={i} label={opt.label} onClick={() => onSelect(opt.score)} />
        ))}
      </div>
    </div>
  );
}
