import React from 'react';

interface InfoFieldProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InfoField: React.FC<InfoFieldProps> = ({ name, value, onChange }) => {
    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '16px',
            }}
        />
    );
};

export default InfoField;