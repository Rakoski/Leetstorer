import { commitMutation, graphql } from 'react-relay';
import {testEnvironment} from '../__mocks__/test_utils/testEnvironment';
import constants from "../constants";
import environment from "../RelayEnvironment";

const mutation = graphql`
    mutation CreateUserMutation($userInput: UserInput!) {
        createUser(userInput: $userInput) {
            _id
            username
            email
            createdProblems {
                _id
                title
                level
                description
                user_description
                frequency
                link
                data_structure
                date
            }
        }
    }
`;

export default function createUser(username: string, email: string, password: string, callback: Function, onError: Function) {
    const variables = {
        userInput: {
            username,
            email,
            password
        }
    };

    commitMutation(
        constants.testing ? testEnvironment : environment,
        {
            mutation,
            variables,
            onCompleted: (response, errors) => {
                if (response) {
                    callback(response);
                } else if (errors && errors.length > 0) {
                    onError(new Error("Email already in use!"));
                } else {
                    onError(new Error("An unexpected error occurred."));
                }
            },
            onError: (error) => {
                onError(error);
            }
    });
}
