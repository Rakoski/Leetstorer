import {
    commitMutation,
    graphql
} from 'react-relay'
import environment from '../RelayEnvironment.ts'
import constants from "../constants";
import {testEnvironment} from "../__mocks__/test_utils/testEnvironment";

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
        constants.testing ? testEnvironment : environment,
        {
            mutation,
            variables,
            onCompleted: (response: { resetPassword?: boolean }) => {
                const success = response.resetPassword;
                if (success) {
                    callback(success);
                }
            },
            onError: (err) => onError(err),
        },
    );
};
