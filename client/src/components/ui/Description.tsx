import * as React from "react";

interface DescriptionProps {
    content: string;
    className?: string;
}

export const Description = ({ content, className = "text-sm text-gray-700" }: DescriptionProps) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('-')) {
            // Add to current list
            currentList.push(
                <li key={index} className="mb-1">
                    {trimmedLine.substring(1).trim()}
                </li>
            );
        } else if (trimmedLine) {
            // If we have a current list, close it first
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${index}`} className="list-disc list-inside mb-2">
                        {currentList}
                    </ul>
                );
                currentList = [];
            }
            // Add regular paragraph
            elements.push(
                <p key={index} className="mb-2">
                    {trimmedLine}
                </p>
            );
        }
    });
    
    // Close any remaining list
    if (currentList.length > 0) {
        elements.push(
            <ul key="final-list" className="list-disc list-inside mb-2">
                {currentList}
            </ul>
        );
    }
    
    return (
        <div className={className}>
            {elements}
        </div>
    );
}; 