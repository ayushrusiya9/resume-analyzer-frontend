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
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-sm font-semibold text-blue-900 mb-2">Save this analysis?</h3>
      <p className="text-xs text-blue-700 mb-3">
        Create a free account to view your analysis history anytime.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
        >
          {isLoading ? "Loading..." : "Sign up to save"}
        </button>
        <button
          onClick={() => router.push("/login")}
          className="flex-1 px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded text-sm font-medium hover:bg-blue-50 disabled:opacity-60"
          disabled={isLoading}
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}