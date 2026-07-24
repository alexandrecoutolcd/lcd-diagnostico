type Props = {
  index: number;
  label: string;
  onClick: () => void;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function OptionButton({ index, label, onClick }: Props) {
  return (
    <button type="button" className="quiz-option" onClick={onClick}>
      <span className="quiz-option-index">{LETTERS[index] ?? index + 1}</span>
      <span>{label}</span>
    </button>
  );
}
