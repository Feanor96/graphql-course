const {gql} = require('apollo-server');

const typeDefs = gql`
    type User {
        name: String!
        id: ID!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    enum Nationality {
        CANADA 
        BRAZIL
        INDIA
        CHILE
        GERMANY
    }
`

module.exports = {typeDefs}