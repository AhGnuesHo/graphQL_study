import { database } from "./database.js";
import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`;

const resolvers = {
  Query: {
    teams: () =>
      database.teams.map((team) => {
        team.supplies = database.supplies.filter((item) => {
          return item.team === team.id;
        });
        return team;
      }),
    team: (index, id) =>
      database.teams.find((team) => {
        return team.id === id.id;
      }),
    equipments: () => database.equipments,
    supplies: () => database.supplies,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
//typeDefs : gQL에서 사용할 타입구조 지정
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
