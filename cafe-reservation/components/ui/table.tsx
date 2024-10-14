// components/ui/table.tsx
import React from 'react';

interface TableProps {
    headers: string[];
    data: Array<Record<string, string | number>>;
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    return (
        <table className="border-collapse border border-gray-300 w-full">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border border-gray-300 p-2">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex} className="border border-gray-300 p-2">
                                {row[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
