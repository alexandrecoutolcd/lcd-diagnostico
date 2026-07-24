type Props = {
  current: number;
  total: number;
  label: string;
};

export default function ProgressBar({ current, total, label }: Props) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="mb-10">
      <div className="quiz-progress-track mb-2">
        <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium tracking-wide text-muted uppercase">{label}</span>
    </div>
  );
}
