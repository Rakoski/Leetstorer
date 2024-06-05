import {
    commitMutation,
    graphql
} from 'react-relay'
import environment from '../RelayEnvironment.ts'

const mutation = graphql`
    mutation ResetPasswordMutation($token: String!, $newPassword: String!) {
        resetPassword(token: $token, newPassword: $newPassword)
    }
`;

export default (
    token: string,
    newPassword: string,
    callback: (success: boolean) => void,
    onError: (error: unknown) => void,
) => {
    const variables = {
        token,
        newPassword
    };

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response: { resetPassword: boolean }) => {
                const success = response.resetPassword;
                callback(success);
                console.log("response: ", response)
                console.log("Password reset successful: ", success)
            },
            onError: (err) => onError(err),
        },
    );
};
