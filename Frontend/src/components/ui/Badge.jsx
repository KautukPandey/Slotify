import React from "react";

const Badge = ({ children, variant = "slate", className = "", ...props }) => {
    const getBadgeStyle = () => {
        switch (variant) {
            case "emerald":
            case "success":
                return "badge-emerald";
            case "red":
            case "danger":
                return "badge-red";
            case "blue":
            case "primary":
                return "badge-blue";
            case "amber":
            case "warning":
                return "badge-amber";
            case "slate":
            default:
                return "badge-slate";
        }
    };

    return (
        <span className={`${getBadgeStyle()} ${className}`} {...props}>
            {children}
        </span>
    );
};

export default Badge;
