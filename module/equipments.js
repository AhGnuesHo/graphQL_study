import { gql } from "apollo-server";
import { dbWorks } from "../dbWorks.js";
export const Equipment = gql`
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
`;

export const E_resolvers = {
  Query: {
    equipments: (parent, args, context, info) => dbWorks.getEquipments(args),
  },
  Mutation: {
    deleteEquipment: (parent, args, context, info) =>
      dbWorks.deleteItem("equipments", args),
    insertEquipment: (parent, args, context, info) =>
      dbWorks.postEquipment(args),
    editEquipment: (parent, args, context, info) => dbWorks.editEquipment(args),
  },
};
