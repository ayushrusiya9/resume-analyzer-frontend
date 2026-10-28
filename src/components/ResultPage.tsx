import React from "react";
import { SaveToAccountButton } from "@/components/SaveToAccountButton";

interface ResultPageProps {
  match_score?: number;
  resume_skills?: string[];
  missing_skills?: string[];
  suggestions?: string[];
  strengths?: string[];
}

function getScoreColor(score: number) {
  if (score >= 70) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 40) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
}

function getScoreLabel(score: number) {
  if (score >= 70) return "Strong match";
  if (score >= 40) return "Moderate match";
  return "Needs improvement";
}

const ResultPage: React.FC<ResultPageProps> = ({
  match_score = 88,
  resume_skills = ["Python", "React"],
  missing_skills = ["TypeScript", "FastAPI"],
  suggestions = [
    "Add more TypeScript experience.",
    "Highlight FastAPI projects.",
  ],
  strengths = [],
}) => {
  const score = Math.max(0, Math.min(100, Math.round(match_score)));
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const gradId = React.useId();

  const contentScore = Math.min(Math.round((resume_skills.length / 10) * 100), 100);
  const structureScore = 70; // Placeholder until real analysis is available.
  const toneScore = 55; // Placeholder until real analysis is available.

  const breakdown = [
    { label: "Tone & style", value: toneScore },
    { label: "Content", value: contentScore },
    { label: "Structure", value: structureScore },
    { label: "Skills match", value: score },
  ];

  const getStatus = (value: number) => {
    if (value >= 70) {
      return {
        label: "Strong",
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
        bar: "bg-emerald-500",
      };
    }
    if (value >= 40) {
      return {
        label: "Average",
        badge: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
        bar: "bg-amber-500",
      };
    }
    return {
      label: "Needs work",
      badge: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20",
      bar: "bg-rose-500",
    };
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Resume insights
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Resume review
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            See how your resume performs and what you can improve for your next application.
          </p>
        </div>

        {/* Score overview */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[240px_1fr] md:items-center md:p-10">
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-48 w-48">
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full -rotate-90"
                  role="img"
                  aria-label={`Resume match score ${score} out of 100`}
                >
                  <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={score >= 70 ? "#34D399" : score >= 40 ? "#FBBF24" : "#FB7185"} />
                      <stop offset="100%" stopColor={score >= 70 ? "#059669" : score >= 40 ? "#D97706" : "#E11D48"} />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="9"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-extrabold tracking-tight ${getScoreColor(score)}`}>
                    {score}
                  </span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    out of 100
                  </span>
                </div>
              </div>
              <span className={`mt-4 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getScoreColor(score)} bg-slate-100 dark:bg-slate-800`}>
                {getScoreLabel(score)}
              </span>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {missing_skills.length} missing skill{missing_skills.length === 1 ? "" : "s"}
              </p>
            </div>

            <div>
              <div className="mb-5">
                <h2 className="text-xl font-bold sm:text-2xl">Your resume at a glance</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Use this breakdown to identify the areas that need attention before applying.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {breakdown.map((item) => {
                  const status = getStatus(item.value);
                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {item.label}
                        </span>
                        <span className="text-lg font-bold tabular-nums">
                          {item.value}<span className="text-xs font-medium text-slate-400">/100</span>
                        </span>
                      </div>
                      <div
                        className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
                        role="progressbar"
                        aria-label={`${item.label} score`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={item.value}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${status.bar}`}
                          style={{ width: `${Math.max(0, Math.min(100, item.value))}%` }}
                        />
                      </div>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold">Skills found</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Skills detected in your resume
                </p>
              </div>
              <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {resume_skills.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {resume_skills.length > 0 ? (
                resume_skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">No specific skills were extracted.</p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold">Missing skills</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Consider adding these where relevant
                </p>
              </div>
              <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {missing_skills.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {missing_skills.length > 0 ? (
                missing_skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800 dark:border-rose-900 dark:bg-rose-400/10 dark:text-rose-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  No missing skills detected.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Suggestions */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <path d="M12 18h.01M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold">Recommended improvements</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Practical next steps to strengthen your resume
              </p>
            </div>
          </div>

          {suggestions.length > 0 ? (
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${index}-${suggestion}`}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                    {index + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">No suggestions available.</p>
          )}

          {strengths.length > 0 && (
            <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
              <h3 className="mb-3 font-semibold">Your strengths</h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={`${index}-${strength}`} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-emerald-500" aria-hidden="true">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 border-t border-slate-200 pt-6 dark:border-slate-800">
            <SaveToAccountButton
              analysis={{
                match_score,
                job_title: "",
                resume_skills,
                missing_skills,
                strengths,
                suggestions,
              }}
            />
          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Scores are estimates based on the available analysis and should be reviewed alongside the job description.
        </p>
      </section>
    </main>
  );
};

export default ResultPage;
