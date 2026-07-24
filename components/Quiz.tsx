"use client";

import { useEffect, useMemo, useState } from "react";
import ProgressBar from "./ProgressBar";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import RevenueScreen from "./RevenueScreen";
import LeadForm from "./LeadForm";
import ResultView from "./ResultView";
import { FORM_NAME, QUIZ_DATA, REVENUE_OPTIONS, SOLUTIONS } from "@/lib/quiz-data";
import {
  computeBlockScores,
  computeOverall,
  getConsultoriaTitle,
  getWeakestAreas,
  maturitySubtitle,
} from "@/lib/scoring";
import { captureUtms, getSubmissionDateTime } from "@/lib/utm";
import type { LeadFormData, RevenueOption } from "@/lib/types";

type Step = "start" | "question" | "revenue" | "lead" | "result";

const flatQuestions = QUIZ_DATA.flatMap((block, blockIndex) =>
  block.questions.map((_, qIndex) => ({ blockIndex, qIndex }))
);
const TOTAL_QUESTIONS = flatQuestions.length;
const TOTAL_STEPS = TOTAL_QUESTIONS + 1; // + pergunta de faturamento

export default function Quiz() {
  const [step, setStep] = useState<Step>("start");
  const [currentFlatIndex, setCurrentFlatIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[][]>(
    QUIZ_DATA.map((b) => new Array(b.questions.length).fill(null))
  );
  const [selectedRevenue, setSelectedRevenue] = useState<RevenueOption | null>(null);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Captura UTMs assim que o quiz carrega, para não perder a origem do lead.
  useEffect(() => {
    captureUtms();
  }, []);

  const results = useMemo(() => {
    const blockScores = computeBlockScores(answers);
    const overall = computeOverall(blockScores);
    const { weakest, secondWeakest } = getWeakestAreas(blockScores);
    return { blockScores, overall, weakest, secondWeakest };
  }, [answers]);

  function handleSelectAnswer(score: number) {
    const { blockIndex, qIndex } = flatQuestions[currentFlatIndex];
    setAnswers((prev) => {
      const next = prev.map((arr) => [...arr]);
      next[blockIndex][qIndex] = score;
      return next;
    });

    if (currentFlatIndex + 1 >= TOTAL_QUESTIONS) {
      setStep("revenue");
    } else {
      setCurrentFlatIndex((i) => i + 1);
    }
  }

  function handleBackQuestion() {
    setCurrentFlatIndex((i) => Math.max(0, i - 1));
  }

  function handleSelectRevenue(opt: RevenueOption) {
    setSelectedRevenue(opt);
    setStep("lead");
  }

  async function handleLeadSubmit(data: LeadFormData) {
    setLeadData(data);
    setSubmitError(null);
    setSubmitting(true);

    const { blockScores, overall, weakest } = results;
    const solution = selectedRevenue ? SOLUTIONS[selectedRevenue.solutionKey] : null;
    const recommendationTitle =
      selectedRevenue?.solutionKey === "consultoria"
        ? getConsultoriaTitle(weakest.key)
        : solution?.title || "";

    const utms = captureUtms();
    const { date, time } = getSubmissionDateTime();

    const payload = {
      formName: FORM_NAME,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      revenue: selectedRevenue?.label || "",
      // Score geral de maturidade (0 a 100)
      scoreGeral: overall,
      // Nome da área com menor pontuação (o ponto mais crítico do diagnóstico)
      areaCritica: weakest.label,
      // Produto/solução recomendada com base no faturamento e na área crítica
      recomendacao: recommendationTitle,
      // Score de cada um dos 6 blocos, ex: {"Lucratividade":"27%","Controladoria":"22%",...}
      scoresPorBloco: blockScores.reduce((acc: Record<string, string>, b) => {
        acc[b.label] = `${b.pct}%`;
        return acc;
      }, {}),
      utm_source: utms.utm_source,
      utm_campaign: utms.utm_campaign,
      utm_medium: utms.utm_medium,
      utm_content: utms.utm_content,
      submissionDate: date,
      submissionTime: time,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Falha ao registrar lead no Make. Seguindo o fluxo mesmo assim.");
      }
    } catch (err) {
      console.error("Erro de rede ao registrar lead. Seguindo o fluxo mesmo assim.", err);
    } finally {
      setSubmitting(false);
      setStep("result");
    }
  }

  const progressCurrent =
    step === "question"
      ? currentFlatIndex
      : step === "revenue" || step === "lead" || step === "result"
      ? TOTAL_QUESTIONS
      : 0;

  const progressLabel =
    step === "result"
      ? "Diagnóstico concluído"
      : step === "revenue" || step === "lead"
      ? "Última etapa"
      : `Pergunta ${Math.min(currentFlatIndex + 1, TOTAL_QUESTIONS)} de ${TOTAL_QUESTIONS}`;

  const currentQuestion =
    step === "question" ? flatQuestions[currentFlatIndex] : null;
  const currentBlock = currentQuestion ? QUIZ_DATA[currentQuestion.blockIndex] : null;
  const currentQuestionData = currentQuestion
    ? currentBlock!.questions[currentQuestion.qIndex]
    : null;

  const recSolution = selectedRevenue ? SOLUTIONS[selectedRevenue.solutionKey] : null;
  const recTitle =
    selectedRevenue?.solutionKey === "consultoria"
      ? getConsultoriaTitle(results.weakest.key)
      : recSolution?.title || "";

  const whatsappMessage = encodeURIComponent(
    `Olá! Sou ${leadData?.name || ""}, fiz o diagnóstico da LCD e quero saber mais sobre ${recTitle}.`
  );

  return (
    <div className="max-w-[680px] mx-auto px-6 sm:px-8 py-12 sm:py-16">
      {step !== "start" && (
        <ProgressBar current={progressCurrent} total={TOTAL_STEPS} label={progressLabel} />
      )}

      {step === "start" && <StartScreen onStart={() => setStep("question")} />}

      {step === "question" && currentBlock && currentQuestionData && (
        <QuestionScreen
          block={currentBlock}
          blockIndex={currentQuestion!.blockIndex}
          totalBlocks={QUIZ_DATA.length}
          questionText={currentQuestionData.text}
          options={currentQuestionData.options}
          onSelect={handleSelectAnswer}
          onBack={handleBackQuestion}
          canGoBack={currentFlatIndex > 0}
        />
      )}

      {step === "revenue" && (
        <RevenueScreen
          options={REVENUE_OPTIONS}
          onSelect={handleSelectRevenue}
          onBack={() => {
            setCurrentFlatIndex(TOTAL_QUESTIONS - 1);
            setStep("question");
          }}
        />
      )}

      {step === "lead" && (
        <LeadForm
          onBack={() => setStep("revenue")}
          onSubmit={handleLeadSubmit}
          submitting={submitting}
          submitError={submitError}
        />
      )}

      {step === "result" && leadData && selectedRevenue && (
        <ResultView
          firstName={leadData.name.split(" ")[0]}
          overall={results.overall}
          maturityText={maturitySubtitle(results.overall)}
          blockScores={results.blockScores}
          weakest={results.weakest}
          secondWeakest={results.secondWeakest}
          recTitle={recTitle}
          recText={recSolution?.text || ""}
          whatsappHref={`https://wa.me/?text=${whatsappMessage}`}
        />
      )}
    </div>
  );
}
