import { commitMutation, graphql } from 'react-relay';
import environment from '../RelayEnvironment.ts';

// requestPasswordReset(email: String!): Boolean!
const mutation = graphql`
    mutation RequestPasswordResetMutation($email: String!) {
        requestPasswordReset(email: $email)
    }
`;

export default (email, callback, errorCallback) => {
    const variables = {
        email: email,
    };

    commitMutation(environment, {
        mutation,
        variables,
        onCompleted: (response, errors) => {
            if (errors) {
                console.log("entered errors");
                errorCallback(errors);
                return;
            }
            else if (response) {
                console.log("entered response");
                callback();
            } else {
                console.log("error")
                errorCallback('Failed to request password reset');
            }
        },
        onError: errorCallback,
    });
};
