import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error(
      "MAKE_WEBHOOK_URL não configurada. Defina essa variável de ambiente na Vercel para receber os leads no Make."
    );
    // Não travamos a experiência do usuário por falta de configuração,
    // mas sinalizamos o erro para quem está integrando.
    return NextResponse.json(
      { ok: false, error: "Webhook não configurado no servidor." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Webhook do Make respondeu com erro:", res.status, text);
      return NextResponse.json(
        { ok: false, error: "Falha ao enviar para o Make." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro ao chamar o webhook do Make:", err);
    return NextResponse.json(
      { ok: false, error: "Erro de rede ao enviar para o Make." },
      { status: 502 }
    );
  }
}
