import { commitMutation, graphql } from 'react-relay';
import constants from "../constants";
import {testEnvironment} from '../__mocks__/test_utils/testEnvironment';
import environment from "../RelayEnvironment";

interface LoginResponse {
    login: {
        userId: string,
        token: string
    } | null | undefined;
}

const mutation = graphql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

export default (email: string, password: string, callback: Function, errorCallback: Function) => {
    const variables = {
        email,
        password
    };

    commitMutation(
         constants.testing ? testEnvironment : environment,
        {
            mutation,
            variables,
            onCompleted: (response: { login?: LoginResponse["login"] }, errors) => {
                try {
                    const login = response.login;
                    if (login && login.userId && login.token) {
                        const id = login.userId;
                        const token = login.token;
                        callback(id, token);
                    } else {
                        errorCallback("Invalid email or password");
                    }
                } catch (error) {
                    console.log("Error during login operation: ", error);
                }
            },
            onError: err => errorCallback(err.message || "An unknown error occurred."),
        },
    );
};



