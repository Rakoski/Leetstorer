import React from 'react';

interface InfoFieldProps {
    name: string;
    type?: string | undefined;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const InfoField: React.FC<InfoFieldProps> = ({ name, value, type, onChange }) => {
    return (
        <input
            name={name}
            value={value}
            type={type ? type : 'text'}
            placeholder={name}
            onChange={onChange}
            readOnly={!onChange}
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