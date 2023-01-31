import { gql } from "apollo-server";
import { dbWorks } from "../dbWorks.js";
export const Supply = gql`
  type Supply {
    id: String
    team: Int
  }
`;
export const S_resolvers = {
  Query: {
    supplies: (parent, args, context, info) => dbWorks.getSupplies(args),
  },
};
