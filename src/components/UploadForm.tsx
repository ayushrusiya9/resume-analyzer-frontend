"use client";

import React, { useState } from "react";
import Button from "./Button";
import uploadResume from "@/services/api.service";
import ResultPage from "./ResultPage";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function UploadForm() {
    const [errors, setErrors] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();

    const validate = (formData: FormData) => {
        const newError: any = {};

        const companyName = formData.get("company_name")?.toString().trim();
        const jobTitle = formData.get("job_title")?.toString().trim();
        const jobDescription = formData.get("job_description")?.toString().trim();
        const resumeFile = formData.get("resume_file");

        if (!companyName) newError.company_name = "Company name is required";
        if (companyName && companyName.length < 3)
            newError.company_name = "Min 3 characters required";

        if (!jobTitle) newError.job_title = "Job title is required";
        if (jobTitle && jobTitle.length < 3)
            newError.job_title = "Min 3 characters required";

        if (!jobDescription) newError.job_description = "Job description is required";
        if (jobDescription && jobDescription.length < 10)
            newError.job_description = "Min 10 characters required";

        if (!resumeFile) newError.resume_file = "Resume required";

        if (resumeFile && (resumeFile as File).size > 5 * 1024 * 1024)
            newError.resume_file = "Max size 5MB";

        if (
            resumeFile &&
            !["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
                (resumeFile as File).type
            )
        ) {
            newError.resume_file = "Only PDF or Word allowed";
        }

        return newError;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const saveAnalysis = async (result: any) => {
        if (!user) return;
        try {
            setSaving(true);
            const formData = {
                company_name: result.company_name || "",
                job_title: result.job_title || "",
                match_score: result.match_score,
                skills_score: result.skills_score,
                resume_skills: result.resume_skills || [],
                missing_skills: result.missing_skills || [],
                strengths: result.strengths || [],
                suggestions: result.suggestions || [],
            };
            const res = await axios.post(`${API}/api/v1/analyses`, formData, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.data) {
                toast.success("Analysis saved to your history!");
            }
        } catch (err: any) {
            console.error("Failed to save analysis:", err);
            toast.error("Failed to save analysis to history.");
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const validationErrors = validate(formData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setIsLoading(true);

        uploadResume(formData)
            .then(async (data) => {
                setAnalysisResult(data);
                if (user) {
                    await saveAnalysis(data);
                }
            })
            .catch((error) => {
                setErrors({ submit: "Upload failed: " + error.message });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div id="upload-section" className="w-full max-w-4xl mx-auto mt-4 px-4 sm:px-6 md:px-8">

            {isLoading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-2xl max-w-sm w-full transition-colors">
                        <svg
                            className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                            Analyzing Resume...
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                            Running ATS checks and semantic skill matching
                        </p>
                        <div className="w-full">
                            <Button disabled>
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                    Processing...
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* RESULT PAGE */}
            {analysisResult ? (
                <ResultPage
                    match_score={analysisResult?.match_score}
                    resume_skills={analysisResult?.resume_skills}
                    missing_skills={analysisResult?.missing_skills}
                    suggestions={analysisResult?.suggestions}
                    strengths={analysisResult?.strengths}
                />
            ) : (

                /* FORM */
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className={`flex flex-col gap-6 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Company */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Company Name</label>
                            <input
                                name="company_name"
                                placeholder="eg. Google"
                                className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 p-2.5 rounded-lg w-full text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-xs transition-colors"
                            />
                            {errors.company_name && (
                                <p className="text-rose-500 text-sm mt-1">{errors.company_name}</p>
                            )}
                        </div>

                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Job Title</label>
                            <input
                                name="job_title"
                                placeholder="eg. Software Engineer"
                                className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 p-2.5 rounded-lg w-full text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-xs transition-colors"
                            />
                            {errors.job_title && (
                                <p className="text-rose-500 text-sm mt-1">{errors.job_title}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Job Description</label>
                        <textarea
                            name="job_description"
                            placeholder="eg. We are looking for a skilled software engineer..."
                            className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 p-3 rounded-lg w-full h-28 md:h-32 text-sm md:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-400 shadow-xs transition-colors resize-y"
                        />
                        {errors.job_description && (
                            <p className="text-rose-500 text-sm mt-1">{errors.job_description}</p>
                        )}
                    </div>

                    {/* Upload */}
                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-0.5">
                            Upload Resume
                        </label>

                        <label
                            htmlFor="resume_file"
                            className="flex flex-col items-center justify-center w-full h-40 md:h-48 px-4 md:px-6 bg-white/70 dark:bg-slate-900/60 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 cursor-pointer hover:bg-white dark:hover:bg-slate-900 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-xs transition-all duration-200"
                        >
                            <div className="text-3xl mb-2">📄</div>

                            <p className="text-gray-800 dark:text-gray-200 font-semibold text-base">
                                Click to upload <span className="text-gray-500 dark:text-gray-400 font-normal">or drag and drop</span>
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
                                PDF, DOC or DOCX (max. 5MB)
                            </p>

                            {/* Hidden input */}
                            <input
                                type="file"
                                id="resume_file"
                                name="resume_file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />

                            {/* Show selected file name */}
                            {selectedFile && (
                                <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-2 font-medium truncate w-11/12 text-center">
                                    Selected file: {selectedFile.name}
                                </p>
                            )}
                        </label>
                        {errors.resume_file && (
                            <p className="text-rose-500 text-sm mt-0.5">{errors.resume_file}</p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <Button disabled={isLoading || saving}>
                        {saving ? "Saving..." : isLoading ? "Uploading..." : "Upload & Analyze Resume"}
                    </Button>

                    {errors.submit && (
                        <p className="text-rose-500 text-sm text-center">
                            {errors.submit}
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}
