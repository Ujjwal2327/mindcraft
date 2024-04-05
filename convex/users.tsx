import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: {
    email: v.string(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return result; // returns array of user objects
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db.insert("users", args); // returns _id
    return result;
  },
});
