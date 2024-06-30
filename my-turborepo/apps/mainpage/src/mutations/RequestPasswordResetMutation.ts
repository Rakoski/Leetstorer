import { commitMutation, graphql } from 'react-relay';
import environment from '../RelayEnvironment.ts';
import constants from "../constants";
import {testEnvironment} from "../__mocks__/test_utils/testEnvironment";
import {Callback} from "mongodb";

// requestPasswordReset(email: String!): Boolean!
const mutation = graphql`
    mutation RequestPasswordResetMutation($email: String!) {
        requestPasswordReset(email: $email)
    }
`;

export default (email: string, callback: Callback, errorCallback: Function) => {
    const variables = {
        email: email,
    };

    commitMutation(
        constants.testing ? testEnvironment : environment,
        {
        mutation,
        variables,
        onCompleted: (response, errors) => {
            if (errors) {
                console.log("entered errors");
                errorCallback(errors);
                return;
            }
            else if (response) {
                callback();
            } else {
                console.log("error")
                errorCallback('Failed to request password reset');
            }
        },
        onError: errorCallback(),
    });
};
