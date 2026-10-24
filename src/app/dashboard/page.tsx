"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push("/login");
      return;
    }
    axios
      .get(`${API}/api/v1/analyses`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((res) => setAnalyses(res.data || []))
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false));
  }, [user, router]);

  if (!mounted) return null;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-gray-900 dark:text-gray-100 p-4 sm:p-6 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Analysis History</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review your past resume evaluations</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-indigo-100 dark:hover:bg-slate-700 transition-colors"
            >
              Analyze New
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading history...</div>
        ) : analyses.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl p-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No analyses yet.</p>
            <Link href="/" className="mt-3 inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Upload your first resume
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/60 border-b border-gray-200 dark:border-slate-800">
                  <th className="p-3.5 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Job Title</th>
                  <th className="p-3.5 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Company</th>
                  <th className="p-3.5 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Match Score</th>
                  <th className="p-3.5 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {analyses.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 sm:p-4 font-medium text-gray-900 dark:text-white text-sm">{a.job_title}</td>
                    <td className="p-3.5 sm:p-4 text-gray-600 dark:text-gray-400 text-sm">{a.company_name || "—"}</td>
                    <td className="p-3.5 sm:p-4 text-sm">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full font-bold text-xs ${
                        a.match_score >= 70
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : a.match_score >= 40
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                          : "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                      }`}>
                        {a.match_score}%
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      {a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
