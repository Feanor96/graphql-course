const { ApolloServer } = require('apollo-server');

const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');

const server = new ApolloServer({ typeDefs, resolvers, context: () => {
    return { name: "Salim" }
}})

server.listen().then(({url}) => {
    console.log(`API is listening at port ${url}`)
}).catch(err => {
    console.error(`There is an error ${err}`)
})