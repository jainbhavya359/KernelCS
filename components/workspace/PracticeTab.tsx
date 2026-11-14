"use client";

import React, { useState } from "react";
import {
  CurriculumQuestion,
  DifficultyLevel,
} from "@/lib/data/curriculum/types";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Code2,
  Lightbulb,
  FileText,
} from "lucide-react";
import { InlineText, RichContentRenderer } from "@/components/ui/RichContentRenderer";

interface PracticeTabProps {
  topicTitle: string;
  questions: CurriculumQuestion[];
  lessonTitle?: string;
}

const DIFFICULTY_BADGES: Record<DifficultyLevel, { label: string; className: string }> = {
  Foundation: {
    label: "Foundation",
    className: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
  },
  Intermediate: {
    label: "Intermediate",
    className: "text-amber-400 border-amber-800/40 bg-amber-950/20",
  },
  Advanced: {
    label: "Advanced",
    className: "text-red-400 border-red-800/40 bg-red-950/20",
  },
};

export const PracticeTab: React.FC<PracticeTabProps> = ({
  topicTitle,
  questions,
  lessonTitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Extract categories
  const categories = [
    "All",
    "Conceptual",
    "Application",
    "Analytical",
    "Numerical",
    "Scenario",
  ];

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    // Category match
    const categoryMatches =
      selectedCategory === "All" ||
      (q.category && q.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (q.type && q.type.toLowerCase().includes(selectedCategory.toLowerCase()));

    // Difficulty match
    const diffMatches =
      selectedDifficulty === "All" || q.difficulty === selectedDifficulty;

    return categoryMatches && diffMatches;
  });

  // Calculate score stats
  let totalInteractive = 0;
  let totalCorrect = 0;
  questions.forEach((q) => {
    if (q.options && q.correctOptionIndex !== undefined) {
      totalInteractive++;
      if (checkedQuestions[q.id] && userAnswers[q.id] === q.correctOptionIndex) {
        totalCorrect++;
      }
    } else if (q.numericalAnswer) {
      totalInteractive++;
      if (checkedQuestions[q.id]) {
        const val = parseFloat(userAnswers[q.id]);
        const target = q.numericalAnswer.value;
        const tol = q.numericalAnswer.tolerance || 0.1;
        if (!isNaN(val) && Math.abs(val - target) <= tol) {
          totalCorrect++;
        }
      }
    }
  });

  const handleSelectOption = (qid: string, idx: number) => {
    if (checkedQuestions[qid]) return; // lock once checked
    setUserAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleNumericalInput = (qid: string, val: string) => {
    if (checkedQuestions[qid]) return;
    setUserAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const handleCheckQuestion = (qid: string) => {
    setCheckedQuestions((prev) => ({ ...prev, [qid]: true }));
    setRevealedSolutions((prev) => ({ ...prev, [qid]: true }));
  };

  const toggleSolution = (qid: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setCheckedQuestions({});
    setRevealedSolutions({});
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* ── Header & Context Banner ── */}
      <div className="p-5 bg-[#0A0D14] border border-zinc-800 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Practice Workbench</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-normal">
              Problem-Solving Lab: {topicTitle}
            </h2>
            {lessonTitle && (
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Focused practice for lesson: <span className="text-zinc-200">{lessonTitle}</span>
              </p>
            )}
          </div>

          {/* Stats & Reset */}
          <div className="flex items-center gap-3">
            {totalInteractive > 0 && (
              <div className="px-3 py-1.5 bg-[#06080D] border border-zinc-800 rounded-lg text-right">
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Score</div>
                <div className="text-xs font-mono text-amber-400 font-semibold">
                  {totalCorrect} / {totalInteractive} Correct
                </div>
              </div>
            )}
            <button
              onClick={handleReset}
              className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-lg border border-transparent hover:border-zinc-700 transition-all text-xs font-mono flex items-center gap-1"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-zinc-950 font-medium shadow-sm"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown / Filters */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-zinc-500 text-[11px]">Difficulty:</span>
            {["All", "Foundation", "Intermediate", "Advanced"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2 py-0.5 rounded text-[10px] transition-all border ${
                  selectedDifficulty === diff
                    ? "border-amber-400/60 text-amber-300 bg-amber-950/30"
                    : "border-zinc-800/80 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Question List ── */}
      {filteredQuestions.length === 0 ? (
        <div className="p-10 text-center bg-[#070A0F] border border-dashed border-zinc-800 rounded-xl space-y-2">
          <HelpCircle className="w-8 h-8 text-zinc-700 mx-auto" />
          <p className="text-sm font-sans text-zinc-400">
            No questions match the selected category &ldquo;{selectedCategory}&rdquo; and difficulty &ldquo;{selectedDifficulty}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedDifficulty("All");
            }}
            className="text-xs font-mono text-amber-400 hover:underline pt-1"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q, qIndex) => {
            const isChecked = checkedQuestions[q.id];
            const isSolutionRevealed = revealedSolutions[q.id];
            const diffStyle = DIFFICULTY_BADGES[q.difficulty] || DIFFICULTY_BADGES.Intermediate;

            // MCQ State
            const isMCQ = Boolean(q.options && q.options.length > 0 && q.correctOptionIndex !== undefined);
            const selectedOption = userAnswers[q.id];
            const isMCQCorrect = isChecked && selectedOption === q.correctOptionIndex;

            // Numerical State
            const isNumerical = Boolean(q.numericalAnswer);
            const userNumVal = parseFloat(userAnswers[q.id]);
            const isNumCorrect =
              isChecked &&
              isNumerical &&
              !isNaN(userNumVal) &&
              Math.abs(userNumVal - (q.numericalAnswer?.value ?? 0)) <= (q.numericalAnswer?.tolerance ?? 0.1);

            return (
              <div
                key={q.id}
                className="rounded-xl border border-zinc-800 bg-[#0A0D14] overflow-hidden transition-all hover:border-zinc-700/80 shadow-sm"
              >
                {/* Question Header Card */}
                <div className="p-5 space-y-3.5 bg-[#080B10] border-b border-zinc-800/70">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                        Q{String(qIndex + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${diffStyle.className}`}>
                        {diffStyle.label}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950 text-zinc-400">
                        {q.category || q.type}
                      </span>
                    </div>

                    {/* Result badge if checked */}
                    {isChecked && (
                      <div>
                        {isMCQ ? (
                          isMCQCorrect ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-950/30 border border-rose-800/40 px-2.5 py-0.5 rounded">
                              <XCircle className="w-3.5 h-3.5" /> Review Solution
                            </span>
                          )
                        ) : isNumerical ? (
                          isNumCorrect ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-0.5 rounded">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Calculation Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/30 border border-amber-800/40 px-2.5 py-0.5 rounded">
                              <Calculator className="w-3.5 h-3.5" /> Check Working
                            </span>
                          )
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Statement */}
                  <h3 className="text-sm sm:text-base font-sans text-zinc-100 font-medium leading-relaxed">
                    <InlineText text={q.statement} />
                  </h3>

                  {/* Code snippet in question statement if any */}
                  {q.codeSnippet && (
                    <div className="p-3 bg-zinc-950 border border-zinc-900 rounded font-mono text-xs text-amber-200/90 overflow-x-auto whitespace-pre">
                      {q.codeSnippet}
                    </div>
                  )}
                </div>

                {/* ── Interactive Area ── */}
                <div className="p-5 space-y-4 bg-[#0A0D14]">
                  {/* Option 1: MCQ Interactive Choices */}
                  {isMCQ && q.options && (
                    <div className="space-y-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOption === optIdx;
                        const isCorrectOption = optIdx === q.correctOptionIndex;

                        let cardStyle =
                          "border-zinc-800 bg-[#06080D] hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-300";

                        if (isSelected && !isChecked) {
                          cardStyle =
                            "border-amber-400/70 bg-amber-950/20 text-white shadow-sm";
                        } else if (isChecked) {
                          if (isCorrectOption) {
                            cardStyle =
                              "border-emerald-600 bg-emerald-950/30 text-emerald-100 font-medium";
                          } else if (isSelected && !isCorrectOption) {
                            cardStyle =
                              "border-red-600/80 bg-red-950/30 text-red-200";
                          } else {
                            cardStyle = "border-zinc-800/60 bg-zinc-950/40 text-zinc-500 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isChecked}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${cardStyle}`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono flex-shrink-0 mt-0.5 ${
                                isChecked
                                  ? isCorrectOption
                                    ? "border-emerald-400 bg-emerald-500 text-zinc-950 font-bold"
                                    : isSelected
                                    ? "border-red-400 bg-red-500 text-white"
                                    : "border-zinc-700 text-zinc-500"
                                  : isSelected
                                  ? "border-amber-400 bg-amber-400 text-zinc-950 font-bold"
                                  : "border-zinc-700 text-zinc-400"
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="text-xs sm:text-sm font-sans leading-relaxed">
                              <InlineText text={opt} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Option 2: Numerical Input Validation */}
                  {isNumerical && q.numericalAnswer && (
                    <div className="p-4 bg-[#06080D] border border-zinc-800/80 rounded-lg space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <Calculator className="w-3.5 h-3.5 text-amber-400" />
                        <span>Enter your calculated numerical result:</span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <input
                          type="number"
                          step="any"
                          disabled={isChecked}
                          value={userAnswers[q.id] || ""}
                          onChange={(e) => handleNumericalInput(q.id, e.target.value)}
                          placeholder="e.g. 16"
                          className="px-3.5 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 w-44"
                        />
                        {q.numericalAnswer.unit && (
                          <span className="text-xs font-mono text-zinc-400">
                            {q.numericalAnswer.unit}
                          </span>
                        )}
                        {!isChecked && (
                          <button
                            onClick={() => handleCheckQuestion(q.id)}
                            disabled={userAnswers[q.id] === undefined || userAnswers[q.id] === ""}
                            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-mono text-xs font-medium rounded-lg transition-colors"
                          >
                            Validate Calculation
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Bar for MCQ / Short-Answer */}
                  <div className="flex items-center justify-between pt-2">
                    {/* Submit / Check button */}
                    {isMCQ && !isChecked && (
                      <button
                        onClick={() => handleCheckQuestion(q.id)}
                        disabled={selectedOption === undefined}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-mono text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span>Submit Answer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Toggle Solution details */}
                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors ml-auto"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{isSolutionRevealed ? "Hide Solution" : "Reveal Solution & Reasoning"}</span>
                      {isSolutionRevealed ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* ── Revealed Solution Section ── */}
                  {isSolutionRevealed && (
                    <div className="pt-4 mt-2 border-t border-zinc-800/80 space-y-4 bg-[#06080D] -mx-5 -mb-5 p-5">
                      {/* Numerical Formula & Steps */}
                      {isNumerical && q.numericalAnswer && (
                        <div className="p-4 bg-amber-950/15 border-l-2 border-amber-400/80 rounded-r-lg space-y-3">
                          <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-semibold">
                            Target Numerical Result &amp; Formula:
                          </div>
                          <div className="font-mono text-sm text-emerald-400 font-bold">
                            Correct Answer: {q.numericalAnswer.value} {q.numericalAnswer.unit || ""}
                          </div>
                          {q.numericalAnswer.formula && (
                            <div className="text-xs font-mono text-zinc-300 bg-zinc-950/80 p-2.5 rounded border border-zinc-800">
                              <span className="text-zinc-500 uppercase mr-1.5 text-[10px]">Formula:</span>
                              {q.numericalAnswer.formula}
                            </div>
                          )}
                          {q.numericalAnswer.solutionSteps && (
                            <div className="space-y-1.5 pt-1">
                              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                                Step-by-Step Working:
                              </div>
                              {q.numericalAnswer.solutionSteps.map((st, i) => (
                                <div key={i} className="text-xs font-mono text-zinc-300 pl-2 border-l border-amber-400/30">
                                  {st}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step-by-Step Solution if specified */}
                      {q.stepByStepSolution && q.stepByStepSolution.length > 0 && (
                        <div className="p-4 bg-[#080B10] border border-zinc-800 rounded-lg space-y-2.5">
                          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                            Execution Sequence &amp; Analytical Steps:
                          </div>
                          <div className="space-y-1.5">
                            {q.stepByStepSolution.map((st, i) => (
                              <div key={i} className="text-xs font-sans text-zinc-300 leading-relaxed flex items-start gap-2">
                                <span className="font-mono text-amber-400 text-xs font-bold mt-0.5">•</span>
                                <span><InlineText text={st} /></span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Main First-Principles Explanation */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                          First-Principles Solution &amp; Architectural Context:
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                          <RichContentRenderer content={q.explanation} />
                        </div>
                      </div>

                      {/* Analytical Hints */}
                      {q.hints && q.hints.length > 0 && (
                        <div className="p-3 bg-zinc-900/40 border border-zinc-800/60 rounded-lg">
                          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Lightbulb className="w-3 h-3 text-amber-400" />
                            <span>Analytical Clues &amp; Invariants:</span>
                          </div>
                          <ul className="space-y-1">
                            {q.hints.map((h, i) => (
                              <li key={i} className="text-xs text-zinc-400 font-sans flex items-start gap-2">
                                <span className="text-amber-400/80">→</span>
                                <span><InlineText text={h} /></span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Expected Outcome */}
                      {q.expectedOutcome && (
                        <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg text-xs font-mono text-emerald-300">
                          <span className="text-emerald-500 font-bold uppercase text-[10px] mr-2">
                            Evaluation Criteria:
                          </span>
                          {q.expectedOutcome}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
