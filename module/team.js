import { gql } from "apollo-server";
import { dbWorks } from "../dbWorks.js";
export const Team = gql`
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
export const T_resolvers = {
  Query: {
    teams: (parent, args, context, info) => dbWorks.getTeams(args),
    team: (parent, args, context, info) => dbWorks.getTeam(args),
  },
};
