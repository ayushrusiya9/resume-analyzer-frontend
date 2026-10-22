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
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
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
    // If no issues, circle is full; if many issues, circle is low
    // Assume 10+ issues = empty, 0 = full, interpolate in between
    const maxIssues = 10;
    const issues = missing_skills.length;
    const fillPercent = issues >= maxIssues ? 0 : 1 - issues / maxIssues;
    const progress = fillPercent * circumference;
    const strokeDashoffset = circumference - progress;
    const gradId = React.useId();

    // dynamic gradient colors based on score
    const startColor = match_score >= 70 ? "#34D399" : match_score >= 40 ? "#FBBF24" : "#EF4444";
    const endColor = "#6B7280";


    // Dynamic breakdown logic
    // Skills: match_score
    // Content: number of resume_skills (out of 10)
    // Structure: placeholder (always 70)
    // Tone & Style: placeholder (always 55)
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
        <section className="min-h-screen flex justify-center items-start md:items-center p-4 bg-gray-50">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10">

                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-6">Resume Review</h2>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* SCORE CIRCLE */}
                    <div className="flex flex-col items-center justify-center relative w-28 sm:w-32 md:w-40 lg:w-44">
                        <svg viewBox="0 0 140 140" className="w-full h-auto" role="img" aria-label={`Resume score ${match_score}`}>
                            <circle
                                cx="70"
                                cy="70"
                                r={radius}
                                stroke="#eee"
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
                                <linearGradient id={gradId}>
                                    <stop offset="0%" stopColor={startColor} />
                                    <stop offset="100%" stopColor={endColor} />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* CENTER TEXT */}
                        <div className="absolute text-center inset-0 flex flex-col items-center justify-center px-2">
                            <p className={`text-lg sm:text-xl md:text-2xl font-bold ${getScoreColor(match_score)}`}>
                                {match_score}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                {missing_skills.length} issue{missing_skills.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                            Your Resume Score
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Breakdown of your resume quality.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {breakdown.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex justify-between items-center border-b pb-2 pr-2"
                                >
                                    <span className="font-medium text-sm md:text-base">
                                        {item.label}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-sm md:text-base">{item.value}/100</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.color === "green" ? "bg-green-100 text-green-700" : item.color === "yellow" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                                            {item.tag}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div className="mt-8">
                    <h4 className="font-semibold mb-2">Skills Found</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {resume_skills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    <h4 className="font-semibold mb-2">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {missing_skills.length > 0 ? (
                            missing_skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs md:text-sm"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-green-600 text-sm">
                                No missing skills
                            </span>
                        )}
                    </div>

                    <h4 className="font-semibold mb-2">Suggestions</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-6">
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