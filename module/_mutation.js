import { gql } from "apollo-server";
export const Mutation = gql`
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
`;
