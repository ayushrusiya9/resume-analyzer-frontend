
import Navbar from "./Navbar";
import UploadForm from "./UploadForm";

export default function HeroSection() {
    return (
        <section
            className="
                bg-image relative isolate
                min-h-screen w-full
                flex flex-col items-center
                px-4 sm:px-6 lg:px-8
                pb-10 sm:pb-14
                overflow-hidden
            "
        >
            {/* Navbar */}
            <div className="w-full">
                <Navbar />
            </div>

            {/* Hero Content */}
            <div
                className="
                    flex flex-1 flex-col
                    items-center justify-center
                    w-full max-w-6xl
                    py-12 sm:py-16 md:py-20
                "
            >
                <h1
                    className="
                        max-w-5xl
                        text-center
                        text-4xl sm:text-5xl
                        md:text-6xl lg:text-7xl
                        font-extrabold
                        leading-[1.1]
                        tracking-tight
                        px-2 sm:px-4
                        bg-gradient-to-r
                        from-gray-950 via-slate-800 to-indigo-950
                        dark:from-white dark:via-indigo-100 dark:to-indigo-300
                        bg-clip-text text-transparent
                    "
                >
                    Smart Feedback
                    <br />
                    For Your Dream Job
                </h1>
            </div>

            {/* Upload Form */}
            <div className="w-full max-w-3xl">
                <UploadForm />
            </div>
        </section>
    );
}
