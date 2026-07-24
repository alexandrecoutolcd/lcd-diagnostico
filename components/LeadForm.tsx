"use client";

import { useState } from "react";
import { ROLE_OPTIONS } from "@/lib/quiz-data";
import type { LeadFormData } from "@/lib/types";

type Props = {
  onBack: () => void;
  onSubmit: (data: LeadFormData) => void;
  submitting: boolean;
  submitError: string | null;
};

export default function LeadForm({ onBack, onSubmit, submitting, submitError }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<LeadFormData["role"]>("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const phoneDigits = phone.replace(/\D/g, "");

    if (!name.trim() || name.trim().length < 3) {
      setError("Digite seu nome completo.");
      return;
    }
    if (!emailValid) {
      setError("Digite um e-mail válido.");
      return;
    }
    if (phoneDigits.length < 10) {
      setError("Digite um telefone válido, com DDD.");
      return;
    }
    if (!role) {
      setError("Selecione sua função no negócio.");
      return;
    }

    setError("");
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim(), role });
  }

  return (
    <div className="df-fadeup">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-muted hover:text-brand mb-4 transition-colors"
        disabled={submitting}
      >
        ← Voltar e corrigir alguma resposta
      </button>

      <span className="block text-xs font-bold tracking-[0.18em] uppercase text-brand mb-2">
        Falta pouco
      </span>
      <h2 className="heading text-[30px] sm:text-[40px] leading-[1.02] mb-4">
        Seu diagnóstico<br />está pronto.
      </h2>
      <p className="text-body-secondary text-[14px] leading-relaxed max-w-[460px] mb-8">
        Preencha seus dados para liberar o resultado completo e a recomendação feita
        especificamente para o seu negócio.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[440px]">
        <Field label="Nome">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            className="lead-input"
            disabled={submitting}
          />
        </Field>

        <Field label="E-mail">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="lead-input"
            disabled={submitting}
          />
        </Field>

        <Field label="Telefone / WhatsApp">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(00) 00000-0000"
            className="lead-input"
            disabled={submitting}
          />
        </Field>

        <Field label="Qual função você exerce no negócio?">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as LeadFormData["role"])}
            className="lead-input"
            disabled={submitting}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        {(error || submitError) && (
          <span className="text-xs text-accent-neg">{error || submitError}</span>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-brand hover:bg-brand-hover disabled:opacity-60 text-white font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded-xl2 transition-colors"
        >
          {submitting ? "Enviando..." : "Liberar meu diagnóstico"}
        </button>
      </form>

      <style jsx>{`
        .lead-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border-strong);
          color: var(--heading);
          font-family: var(--font-poppins), sans-serif;
          font-size: 15px;
          padding: 10px 2px;
          outline: none;
          transition: border-color 0.2s;
        }
        .lead-input:focus {
          border-color: var(--brand);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
