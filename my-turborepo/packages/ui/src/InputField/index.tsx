import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function InputField({ label, onChange, ...rest }: InputFieldProps): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const inputStyle: React.CSSProperties = {
        marginTop: "20px",
        width: "300px",
        height: "25px",
        border: `2px solid ${isFocused ? "blue" : "grey"}`,
        borderRadius: "5px",
        padding: "5px",
    };

    return (
        <div>
            <label>
                <input
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                    onChange={onChange}
                    placeholder={isFocused ? "" : label}
                    {...rest}
                />
            </label>
        </div>
    );
}
