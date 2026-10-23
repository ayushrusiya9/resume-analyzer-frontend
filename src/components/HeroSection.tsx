import Navbar from "./Navbar";
import UploadForm from "./UploadForm";

export default function HeroSection() {
    return (
        <section className="bg-image min-h-screen bg-cover bg-center w-full flex flex-col items-center p-5 md:p-10">
            {/* Navbar */}
            <Navbar />

            {/* center content */}
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-semibold bg-linear-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5] bg-clip-text text-transparent dark:from-[#C4B5FD] dark:via-[#818CF8] dark:to-[#6366F1] py-12">
                    Smart Feedback <br />
                    For Your Dream Job
                </h1>
            </div>

            {/* Upload Form */}
            <UploadForm />
        </section>
    );
}