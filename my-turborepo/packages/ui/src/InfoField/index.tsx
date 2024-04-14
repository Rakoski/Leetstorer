import styled from 'styled-components';
import React, { HTMLAttributes } from 'react';

interface InfoFieldProps extends HTMLAttributes<HTMLInputElement> {
    value: string;
    link?: boolean;
    readOnly?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ value, link, readOnly, ...rest }) => {
    if (link && value && /^https?:\/\//.test(value)) {
        return <a href={value} {...rest}>{value}</a>;
    }

    return <StyledInput value={value} readOnly={readOnly} />;
};

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default InfoField;
