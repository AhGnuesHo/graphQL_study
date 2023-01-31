import { database } from "./database.js";
import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    teams: [Team]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }
`;
const resolvers = {
  Query: {
    teams: () => database.teams,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
//typeDefs : gQL에서 사용할 타입구조 지정 
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
