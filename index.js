import { ApolloServer } from "apollo-server";
import { Mutation } from "./module/_mutation.js";
import { Query } from "./module/_query.js";
import { Team, T_resolvers } from "./module/team.js";
import { Supply, S_resolvers } from "./module/supply.js";
import { Equipment, E_resolvers } from "./module/equipments.js";

const typeDefs = [Query, Mutation, Team, Equipment, Supply];

const resolvers = [E_resolvers, S_resolvers, T_resolvers];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
