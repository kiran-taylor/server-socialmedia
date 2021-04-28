const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

//const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
} = process.env;

const port = process.env.PORT || 5000;

//const mongourl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;
const mongourl = `mongodb+srv://socialmedia:acPNDX3YM5NtzJvQ@cluster0.tqmxm.mongodb.net/socialmedia?retryWrites=true&w=majority`;

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: port });
  })
  .then((res) => console.log(`server running at ${res.url}`))
  .catch((err) => {
    console.log(err);
  });
