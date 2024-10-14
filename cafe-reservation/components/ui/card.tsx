// components/ui/card.tsx
import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="border rounded p-4 shadow">
            <h2 className="text-lg font-bold">{title}</h2>
            <div>{children}</div>
        </div>
    );
};

export default Card;
