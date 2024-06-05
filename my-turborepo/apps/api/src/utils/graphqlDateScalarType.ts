import { GraphQLScalarType } from 'graphql';

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === 'IntValue') {
            return new Date(parseInt(ast.value, 10));
        }
        return null;
    },
});

export default dateScalar;