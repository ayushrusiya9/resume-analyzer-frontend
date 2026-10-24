import React from "react";
import { SaveToAccountButton } from "@/components/SaveToAccountButton";
import { useAuth } from "@/context/AuthContext";

interface ResultPageProps {
    match_score?: number;
    resume_skills?: string[];
    missing_skills?: string[];
    suggestions?: string[];
    strengths?: string[];
}

// Score color
function getScoreColor(score: number) {
    if (score >= 70) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 40) return "text-amber-500 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
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
    const { user } = useAuth();

    // SVG circle logic based on issues
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const maxIssues = 10;
    const issues = missing_skills.length;
    const fillPercent = issues >= maxIssues ? 0 : 1 - issues / maxIssues;
    const progress = fillPercent * circumference;
    const strokeDashoffset = circumference - progress;
    const gradId = React.useId();

    // Dynamic gradient colors based on score
    const startColor = match_score >= 70 ? "#10B981" : match_score >= 40 ? "#F59E0B" : "#F43F5E";
    const endColor = match_score >= 70 ? "#059669" : match_score >= 40 ? "#D97706" : "#E11D48";

    // Dynamic breakdown logic
    const contentScore = Math.min(Math.round((resume_skills.length / 10) * 100), 100);
    const skillsTag = match_score >= 70 ? "Strong" : match_score >= 40 ? "Average" : "Weak";
    const contentTag = contentScore >= 70 ? "Strong" : contentScore >= 40 ? "Average" : "Needs Work";
    const structureScore = 70; // Placeholder
    const toneScore = 55; // Placeholder
    const breakdown = [
        { label: "Tone & Style", value: toneScore, tag: toneScore >= 70 ? "Strong" : toneScore >= 40 ? "Average" : "Needs Work", color: toneScore >= 70 ? "green" : toneScore >= 40 ? "yellow" : "red" },
        { label: "Content", value: contentScore, tag: contentTag, color: contentScore >= 70 ? "green" : contentScore >= 40 ? "yellow" : "red" },
        { label: "Structure", value: structureScore, tag: structureScore >= 70 ? "Strong" : structureScore >= 40 ? "Average" : "Needs Work", color: structureScore >= 70 ? "green" : structureScore >= 40 ? "yellow" : "red" },
        { label: "Skills", value: Math.round(match_score), tag: skillsTag, color: match_score >= 70 ? "green" : match_score >= 40 ? "yellow" : "red" },
    ];

    return (
        <section className="min-h-screen w-full flex justify-center items-start md:items-center p-4 sm:p-6 transition-colors">
            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 transition-colors">

                {/* TITLE */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                    Resume Review
                </h2>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                    {/* SCORE CIRCLE */}
                    <div className="flex flex-col items-center justify-center relative w-36 sm:w-40 md:w-44 shrink-0">
                        <svg viewBox="0 0 140 140" className="w-full h-auto" role="img" aria-label={`Resume score ${match_score}`}>
                            <circle
                                cx="70"
                                cy="70"
                                r={radius}
                                stroke="currentColor"
                                className="text-gray-100 dark:text-slate-800"
                                strokeWidth="12"
                                fill="none"
                            />

                            <circle
                                cx="70"
                                cy="70"
                                r={radius}
                                stroke={`url(#${gradId})`}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform="rotate(-90 70 70)"
                            />

                            <defs>
                                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={startColor} />
                                    <stop offset="100%" stopColor={endColor} />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* CENTER TEXT */}
                        <div className="absolute text-center inset-0 flex flex-col items-center justify-center px-2">
                            <p className={`text-2xl sm:text-3xl font-extrabold ${getScoreColor(match_score)}`}>
                                {match_score}
                            </p>
                            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                                {missing_skills.length} issue{missing_skills.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 w-full">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            Your Resume Score
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Breakdown of your resume quality and ATS readiness.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {breakdown.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-2.5 pr-2"
                                >
                                    <span className="font-medium text-sm md:text-base text-gray-700 dark:text-gray-300">
                                        {item.label}
                                    </span>
                                    <div className="flex items-center gap-2.5">
                                        <span className="font-semibold text-sm md:text-base text-gray-900 dark:text-white">
                                            {item.value}/100
                                        </span>
                                        <span
                                            className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                                                item.color === "green"
                                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                                                    : item.color === "yellow"
                                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                                                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60"
                                            }`}
                                        >
                                            {item.tag}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2.5">Skills Found</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {resume_skills.length > 0 ? (
                            resume_skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm">No specific skills extracted</span>
                        )}
                    </div>

                    <h4 className="font-bold text-gray-900 dark:text-white mb-2.5">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {missing_skills.length > 0 ? (
                            missing_skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                No missing skills! Great job.
                            </span>
                        )}
                    </div>

                    <h4 className="font-bold text-gray-900 dark:text-white mb-2.5">Suggestions</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1.5 mb-6">
                        {suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>

                    {/* Save to account prompt */}
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
            </div>
        </section>
    );
};

export default ResultPage;

export default ResultPage;