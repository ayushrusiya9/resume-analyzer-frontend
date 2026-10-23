"use client"

import Button from "./Button"
import { ThemeToggle } from "./ThemeToggle"

export default function Navbar() {
    const scrollToUpload = () => {
        const element = document.getElementById('upload-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <nav className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between bg-white dark:bg-gray-900 rounded-full shadow-2xl px-4 py-3 sm:px-6 sm:py-4 mt-4">
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold bg-linear-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5] bg-clip-text text-transparent dark:from-[#C4B5FD] dark:via-[#818CF8] dark:to-[#6366F1]">
                    ANALYZE
                </h1>
                {/* right side button */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div onClick={scrollToUpload} className="cursor-pointer">
                    </div>
                </div>
            </div>
        </nav>
    )
}