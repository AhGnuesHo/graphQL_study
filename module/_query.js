import { gql } from "apollo-server";
export const Query = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
`;
