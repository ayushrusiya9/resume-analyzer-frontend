"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SaveToAccountButtonProps {
  analysis: {
    match_score: number;
    job_title: string;
    company_name?: string;
    resume_skills: string[];
    missing_skills: string[];
    strengths: string[];
    suggestions: string[];
  };
}

export function SaveToAccountButton({ analysis }: SaveToAccountButtonProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (user) return null; // Already logged in — don't show

  const handleSave = () => {
    toast.info("Please sign up or log in to save this analysis.");
    router.push("/register");
  };

  return (
    <div className="mt-6 p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 rounded-xl transition-colors">
      <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 mb-1">Save this analysis?</h3>
      <p className="text-xs text-indigo-700 dark:text-indigo-400 mb-3">
        Create a free account to view your analysis history anytime.
      </p>
      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? "Loading..." : "Sign up to save"}
        </button>
        <button
          onClick={() => router.push("/login")}
          className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
          disabled={isLoading}
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}
