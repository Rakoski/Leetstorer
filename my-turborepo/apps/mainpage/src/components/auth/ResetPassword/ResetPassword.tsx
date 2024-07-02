import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import resetPasswordMutation from "../../../mutations/ResetPasswordMutation.ts";

const PasswordResetPage: React.FC = () => {
    const { token: resetToken } = useParams();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordResetSuccessful, setIsPasswordResetSuccessful] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordReset = async () => {
        console.log("clicked")
        if (newPassword !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        if (!resetToken) {
            console.log('Invalid or missing reset token');
            return;
        }

        resetPasswordMutation(resetToken, newPassword, (success) => {
            if (success) {
                setIsPasswordResetSuccessful(true);
                navigate("/");
            } else {
                console.log('Password reset failed');
            }
        }, (err) => {
            console.error("Error in resetting password:", err);
            console.log('An error occurred while resetting the password');
        });
    };

    const resetPasswordFields = [
        <InputField
            key="newPassword"
            type="password"
            placeholder="New Password"
            label={"New Password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
        />,
        <InputField
            key="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            label={"Confirm New Password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
    ];

    return (
        <div>
            {isPasswordResetSuccessful ? (
                <div>
                    <h2>Password reset successful</h2>
                    <p>You can now log in with your new password.</p>
                    <a href={"/"}>Back to login</a>
                </div>
            ) : (
                <div>
                    <ArticleComponent
                        articleUnderPhrase={"Back to login"}
                        hrefTo="/"
                        isLoginComponent={false}
                        buttonPhrase={"Reset Password"}
                        onClick={handlePasswordReset}
                        title={"Reset your password"}
                        fields={resetPasswordFields}
                    />
                </div>
            )}
            {
                (error && !isPasswordResetSuccessful) && <p>{error}</p>
            }
        </div>
    );
};

export default PasswordResetPage;
