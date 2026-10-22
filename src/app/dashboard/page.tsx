"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analysis History</h1>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Sign out
        </button>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No analyses yet. Upload a resume to get started!</p>
          <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
            Go to upload
          </Link>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 border text-left text-sm font-medium">Job Title</th>
              <th className="p-3 border text-left text-sm font-medium">Company</th>
              <th className="p-3 border text-left text-sm font-medium">Match Score</th>
              <th className="p-3 border text-left text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {analyses.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 border-b">
                <td className="p-3 border">{a.job_title}</td>
                <td className="p-3 border">{a.company_name || "—"}</td>
                <td className="p-3 border">{a.match_score}</td>
                <td className="p-3 border">{a.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}