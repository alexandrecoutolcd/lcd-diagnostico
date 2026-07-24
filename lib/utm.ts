import type { UtmData } from "./types";

const STORAGE_KEY = "lcd_quiz_utms";

const EMPTY_UTMS: UtmData = {
  utm_source: "",
  utm_campaign: "",
  utm_medium: "",
  utm_content: "",
};

/**
 * Lê as UTMs da URL atual (se existirem) e mescla com o que já
 * estiver salvo na sessão, para não perder o dado caso o usuário
 * navegue entre telas ou a URL mude ao longo do fluxo.
 */
export function captureUtms(): UtmData {
  if (typeof window === "undefined") return EMPTY_UTMS;

  let stored: UtmData = EMPTY_UTMS;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = { ...EMPTY_UTMS, ...JSON.parse(raw) };
  } catch {
    // sessionStorage indisponível — segue só com a URL atual
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Partial<UtmData> = {};
  (Object.keys(EMPTY_UTMS) as (keyof UtmData)[]).forEach((key) => {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  });

  const merged: UtmData = { ...stored, ...fromUrl };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // ignora falha de storage — não deve travar o fluxo do quiz
  }

  return merged;
}

export function getSubmissionDateTime(): { date: string; time: string } {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return { date, time };
}
