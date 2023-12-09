import type user from "./user";
import type { types } from "cassandra-driver";

export interface IUserDB {
  insertOne(user: user): Promise<types.ResultSet>;

  updateToken(data: {
    access_token: string;
    token_as: "User" | "Admin" | "Seller";
    id: string;
  }): Promise<types.ResultSet>;

  getUserProfileByIds(ids: string[]): Promise<types.ResultSet>;

  getUserById(id: string): Promise<types.ResultSet>;

  getUserByToken(token: string): Promise<types.ResultSet>;

  getFollowingRecomendation(): Promise<types.ResultSet>;
}
