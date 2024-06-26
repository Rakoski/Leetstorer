const constants = {
    production: false,
    development: true,
    productionApiUrl: 'https://leetstorer.com/graphql',
    developmentApiUrl: 'http://localhost:4000/graphql',
};

export const getCurrentEnvironment = () => {
    if (constants.production) return 'production';
    return 'development';
};

export default constants;