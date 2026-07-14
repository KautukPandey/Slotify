import React from "react";

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary", // 'primary' | 'secondary' | 'danger' | 'ghost'
    className = "",
    disabled = false,
    isLoading = false,
    ...props
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case "secondary":
                return "btn-secondary";
            case "danger":
                return "btn-danger";
            case "ghost":
                return "btn-ghost";
            case "primary":
            default:
                return "btn-primary";
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${getVariantStyles()} ${className} flex items-center justify-center`}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
