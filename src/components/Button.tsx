import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, disabled, className = "", ...props }) => (
    <button
        type="submit"
        disabled={disabled}
        className={`w-full px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold shadow-md hover:shadow-lg transition-all text-base md:text-lg outline-none hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;
