import { commitMutation, graphql } from 'react-relay';
import {testEnvironment} from '../__mocks__/test_utils/testEnvironment';
import constants from "../constants";
import environment from "../RelayEnvironment";

const mutation = graphql`
    mutation GetUserProblemsMutation($userId: ID!) {
        getUserProblems(userId: $userId) {
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
`;

export default (userId: string, callback: Function, errorCallback: Function) => {
    const variables = {
        userId,
    };

    commitMutation(
        constants.testing ? testEnvironment : environment,
        {
            mutation,
            variables,
            onCompleted: (response: {getUserProblems?: object}, errors) => {
                if (errors) {
                    errorCallback(errors);
                } else {
                    callback(response.getUserProblems);
                }
            },
            onError: err => errorCallback(err),
        },
    );
};
