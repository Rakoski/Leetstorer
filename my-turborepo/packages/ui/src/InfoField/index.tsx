import React from 'react';

interface InfoFieldProps {
    name: string;
    type?: string | undefined;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
}

const InfoField: React.FC<InfoFieldProps> = ({ name, value, type, onChange }) => {
    return (
        <input
            name={name}
            value={value}
            type={type ? type : 'text'}
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