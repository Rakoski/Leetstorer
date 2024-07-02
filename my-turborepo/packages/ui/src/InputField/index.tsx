import React, { useState, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
}

export function InputField({ label, type, onChange, ...rest }: InputFieldProps): JSX.Element {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const showEyeIconToMakePasswordVisible = type === "password";
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const inputStyle: React.CSSProperties = {
        marginTop: "20px",
        width: "100%",
        height: "35px",
        border: `2px solid ${isFocused ? "blue" : "grey"}`,
        borderRadius: "5px",
        padding: "5px 30px 5px 5px",
        boxSizing: "border-box",
    };

    const containerStyle: React.CSSProperties = {
        position: "relative",
        width: "300px",
    };

    const iconStyle: React.CSSProperties = {
        position: "absolute",
        right: "10px",
        top: "70%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
        fontSize: "16px",
    };

    return (
        <div style={containerStyle}>
            <input
                type={showEyeIconToMakePasswordVisible && showPassword ? "text" : type}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                onChange={onChange}
                placeholder={isFocused ? "" : label}
                {...rest}
            />
            {showEyeIconToMakePasswordVisible && (
                <button
                    type="button"
                    style={iconStyle}
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
            )}
        </div>
    );
}