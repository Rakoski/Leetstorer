const constants = {
    production: false,
    development: true,
    testing: false,
    productionApiUrl: 'https://leetstorer.com/graphql',
    developmentApiUrl: 'http://localhost:4000/graphql',
    testingApiUrl: 'http://localhost:4001/graphql',
};

export const getCurrentEnvironment = () => {
    if (constants.testing) return 'testing';
    if (constants.production) return 'production';
    return 'development';
};

export default constants;