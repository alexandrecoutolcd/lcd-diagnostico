type Props = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="df-fadeup">
      <span className="block text-xs font-semibold tracking-[0.22em] uppercase text-brand mb-5">
        Lucrando com Delivery
      </span>
      <h1 className="heading text-[38px] sm:text-[52px] leading-[1.02] mb-7">
        Qual é o real estado do seu{" "}
        <span style={{ color: "var(--brand)" }}>negócio?</span>
      </h1>
      <div className="h-[2px] w-full bg-heading mb-7" />
      <p className="text-body-secondary text-[15px] leading-relaxed max-w-[480px] mb-10">
        20 perguntas. 6 áreas. Um raio-X completo da sua operação — lucratividade,
        controladoria, financeiro, processos, equipe e marketing — para te mostrar
        exatamente onde focar agora.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="bg-brand hover:bg-brand-hover text-white font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded-xl2 transition-colors"
      >
        Começar diagnóstico
      </button>
    </div>
  );
}
