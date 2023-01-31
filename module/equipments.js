import { gql } from "apollo-server";
import { dbWorks } from "../dbWorks.js";
export const Equipment = gql`
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type EquipmentAdv {
    id: ID!
    used_by: String!
    count: Int!
    use_rate: Float
    is_new: Boolean!
  }
`;

export const E_resolvers = {
  Query: {
    equipmentAdvs: (parent, args, context, info) =>
      dbWorks.getEquipments(args).map((equipment) => {
        if (equipment.used_by === "developer") {
          equipment.use_rate = Math.random().toFixed(2);
        }
        equipment.is_new = equipment.new_or_used === "new";
        return equipment;
      }),
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
