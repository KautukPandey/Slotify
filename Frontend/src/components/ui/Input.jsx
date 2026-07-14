import React from "react";

const Input = ({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    icon, // Left side icon/node
    suffix, // Right side node (like password visible button)
    className = "",
    ...props
}) => {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`input ${icon ? "pl-10" : ""} ${suffix ? "pr-10" : ""} ${error ? "input-error" : ""
                        }`}
                    {...props}
                />
                {suffix && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {suffix}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium select-none anim-fade-in">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
