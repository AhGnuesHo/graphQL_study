import { database } from "./database.js";
import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Mutation {
    deleteEquipment(id: String): Equipment
    insertEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment

    editEquipment(
      id: String
      used_by: String
      count: Int
      new_or_used: String
    ): Equipment
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
    team: (parent, args, context, info) =>
      database.teams.find((team) => {
        return team.id === args.id;
      }),
    equipments: () => database.equipments,
    supplies: () => database.supplies,
  },
  Mutation: {
    // 실제로는  sql문을 사용하여 구현
    deleteEquipment: (parent, args, context, info) => {
      const deleted = database.equipments.filter((equipment) => {
        return equipment.id === args.id;
      })[0];
      database.equipments = database.equipments.filter((equipment) => {
        return equipment.id !== args.id;
      });
      return deleted;
    },
    insertEquipment: (parent, args, context, info) => {
      database.equipments.push(args);
      return args;
    },

    editEquipment: (parent, args, context, info) => {
      return database.equipments
        .filter((equipment) => {
          return equipment.id === args.id;
        })
        .map((equipment) => {
          Object.assign(equipment, args);
          return equipment;
        })[0];
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
//typeDefs : gQL에서 사용할 타입구조 지정
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
