# Diagnóstico de Maturidade — Lucrando com Delivery

Aplicação Next.js (App Router) + TypeScript + Tailwind, pronta para deploy na Vercel.

## O que mudou em relação à versão anterior (HTML/JS puro)

- Migrado para **Next.js 14 + Node** (rota de API própria em `/api/lead`), hospedável na Vercel.
- Paleta de cores e tipografia (Poppins) agora seguem os arquivos de referência enviados
  (`globals.css`, `tailwind.config.ts`, `layout.tsx`).
- **Removida a tela de "intro de bloco"** com botão "Continuar". Agora, a mudança de pilar
  é sinalizada com um texto em negrito acima da pergunta (ex: "Área 3 de 6 · Financeiro"),
  sem interromper o fluxo com um clique extra.
- **Botão de voltar** adicionado no formulário de lead (e também nas telas de pergunta/faturamento),
  para a pessoa corrigir uma resposta antes de enviar.
- **Novo campo no formulário: função no negócio**, com as 6 opções pedidas
  (Proprietário, Sócio, Gerente, Gestor de Lojas iFood ou 99, Gestor de tráfego, Outro).
- **Captura de UTMs** (`utm_source`, `utm_campaign`, `utm_medium`, `utm_content`) direto da URL,
  persistidas durante a sessão do usuário.
- **Data e hora do envio** são geradas no momento do submit e enviadas como campos separados.
- Campo fixo `formName: "forms-diagnostico-quiz"` incluído em todo envio, para identificação no Make.
- Envio migrado do Google Apps Script para um **webhook do Make (Integromat)**, chamado a partir
  de uma API Route do Next.js (`app/api/lead/route.ts`) — assim a URL do webhook fica no servidor,
  não exposta no código do navegador.
- **Relatório de resultado bem mais completo**: além da pontuação, cada área crítica agora explica
  a implicação prática de não resolver aquele ponto e tangibiliza os ganhos de resolver (o alívio
  imediato, a mudança de rotina em poucos meses, e a transformação de longo prazo no negócio),
  escrito em tom de conversa — sem rótulos técnicos aparentes.
- A recomendação de produto por faixa de faturamento foi reorganizada em uma progressão lógica
  (veja o comentário em `lib/quiz-data.ts` — é fácil de ajustar se a régua comercial de vocês for outra).

## Como rodar localmente

```bash
npm install
cp .env.example .env.local
# edite .env.local e coloque a URL real do webhook do Make
npm run dev
```

Acesse http://localhost:3000

## Deploy na Vercel

1. Suba este projeto para um repositório Git (GitHub, GitLab, etc).
2. Importe o repositório na Vercel.
3. Em **Project Settings → Environment Variables**, adicione:
   - `MAKE_WEBHOOK_URL` = URL do seu cenário/webhook no Make.
4. Deploy.

## Onde ajustar cada coisa

- **Perguntas, faturamento, produtos e textos do diagnóstico:** `lib/quiz-data.ts`
- **Cálculo de pontuação e narrativas de maturidade:** `lib/scoring.ts`
- **Captura de UTM e data/hora:** `lib/utm.ts`
- **Envio para o Make:** `app/api/lead/route.ts`
- **Cores/tipografia:** `app/globals.css` e `tailwind.config.ts`
- **Telas:** pasta `components/`

## Payload enviado ao webhook do Make

```json
{
  "formName": "forms-diagnostico-quiz",
  "name": "...",
  "email": "...",
  "phone": "...",
  "role": "Proprietário",
  "revenue": "Faturo até R$ 50 mil por mês",
  "scoreGeral": 27,
  "areaCritica": "Processos",
  "recomendacao": "Curso Método LCD",
  "scoresPorBloco": {
    "Lucratividade": "27%",
    "Controladoria": "22%",
    "Financeiro": "22%",
    "Processos": "20%",
    "Gestão de Equipe": "24%",
    "Marketing": "47%"
  },
  "utm_source": "instagram",
  "utm_campaign": "lancamento-julho",
  "utm_medium": "cpc",
  "utm_content": "criativo-1",
  "submissionDate": "2026-07-24",
  "submissionTime": "14:32:07"
}
```

## Baixar PDF do diagnóstico

Na tela de resultado há um botão em destaque, em vermelho, **"Baixar PDF do diagnóstico"**.
Ele gera um PDF real (via `html2canvas` + `jsPDF`, 100% no navegador do usuário, sem
precisar de servidor) com todo o conteúdo do relatório — score geral, barras por área,
ponto crítico, recomendação e o disclaimer legal — e dispara o download automaticamente.

## Disclaimer

Foi adicionado, ao final do relatório de resultado (também incluso no PDF), o texto:

> "Este diagnóstico tem finalidade exclusivamente educativa e informativa, com base nas
> respostas fornecidas por você. Ele não substitui uma análise contábil, financeira ou
> jurídica individualizada do seu negócio. A Lucrando com Delivery (LCD) não se
> responsabiliza por decisões ou mudanças realizadas na sua operação com base apenas
> neste resultado."

Se vocês tiverem um texto jurídico padrão, é só substituir em `components/ResultView.tsx`.

## Observação sobre a contagem de perguntas

O quiz mantém as **20 perguntas originais**, divididas em 6 áreas
(Lucratividade, Controladoria, Financeiro, Processos, Gestão de Equipe e Marketing).
Nenhuma pergunta foi adicionada ou removida.
