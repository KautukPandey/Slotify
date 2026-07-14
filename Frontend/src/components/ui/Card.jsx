import React from "react";

const Card = ({ children, className = "", hover = false, onClick, ...props }) => {
    const cardStyle = hover ? "card-hover cursor-pointer" : "card";
    return (
        <div
            onClick={onClick}
            className={`${cardStyle} p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
