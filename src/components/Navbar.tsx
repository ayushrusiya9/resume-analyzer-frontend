"use client";

import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const scrollToUpload = () => {
        const element = document.getElementById('upload-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="w-full">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-full shadow-lg border border-gray-200/70 dark:border-slate-800 transition-colors mt-2">
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-extrabold tracking-wide bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent">
                    ANALYZE
                </h1>
                {/* right side toggle */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div onClick={scrollToUpload} className="cursor-pointer" />
                </div>
            </div>
        </nav>
    );
}
