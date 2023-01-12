const {gql} = require('apollo-server');

const typeDefs = gql`
    type User {
        name: String!
        id: ID!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favouriteMovies: [Movie!]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }

    input UpdateUsernameInput {
        id: ID!
        newUsername: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput!): User
        deleteUser(id: ID!): User
    }

    enum Nationality {
        CANADA 
        BRAZIL
        INDIA
        CHILE
        GERMANY
    }

    type UsersSuccesfulResult {
        users: [User!]!
    }

    type UsersErrorResult {
        message: String!
    }

    union UsersResults = UsersSuccesfulResult | UsersErrorResult
`

module.exports = {typeDefs}