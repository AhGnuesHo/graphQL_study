import { gql } from "apollo-server";
export const Query = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipmentAdvs: [EquipmentAdv]
    equipments: [Equipment]
    supplies: [Supply]
  }
`;
