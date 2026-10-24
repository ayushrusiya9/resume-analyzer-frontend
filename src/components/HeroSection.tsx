import Navbar from "./Navbar";
import UploadForm from "./UploadForm";

export default function HeroSection() {
    return (
        <section className="bg-image min-h-screen w-full flex flex-col items-center px-4 sm:px-6 md:px-10 pb-16 transition-colors">
            {/* Navbar */}
            <Navbar />

            {/* center content */}
            <div className="flex-1 flex items-center justify-center py-10 sm:py-14">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-tight bg-gradient-to-r from-gray-950 via-slate-800 to-indigo-950 dark:from-white dark:via-indigo-100 dark:to-indigo-300 bg-clip-text text-transparent px-4">
                    Smart Feedback <br />
                    For Your Dream Job
                </h1>
            </div>

            {/* Upload Form */}
            <UploadForm />
        </section>
    );
}
