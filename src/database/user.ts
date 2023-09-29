import Cassandra from ".";
import user from "../interfaces/user";

class User extends Cassandra {
  constructor() {
    super();
  }

  public async insertOne({
    id,
    fullname,
    username,
    password,
    is_verified,
    bio,
    image_url,
    background_url,
    status,
    created_at,
    updated_at,
    store_id,
    division,
    role,
    following,
    followers,
  }: user) {
    return await this.client.execute(
      `INSERT INTO users (
            id, 
            fullname, 
            username, 
            password, 
            is_verified, 
            bio, 
            image_url, 
            background_url, 
            status, 
            created_at, 
            updated_at, 
            store_id, 
            division, 
            role,
            following,
            followers,
            access_token,
            token_as
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        id,
        fullname,
        username,
        password,
        is_verified,
        bio,
        image_url,
        background_url,
        status,
        created_at,
        updated_at,
        store_id,
        division,
        role,
        following,
        followers,
        "",
        "",
      ]
    );
  }

  public async updateToken({
    access_token,
    token_as,
    id,
  }: {
    access_token: string;
    token_as: "User" | "Admin" | "Seller";
    id: string;
  }) {
    return await this.client.execute(
      `
      UPDATE users
      SET access_token = ?, token_as = ?
      WHERE id = ?
      `,
      [access_token, token_as, id]
    );
  }

  public async getUserProfileByIds(ids: string[]) {
    return await this.client.execute(
      `
      SELECT id, username, fullname, image_url, background_url, image_id, background_id, bio
      FROM users
      WHERE id IN (${Array(ids.length).fill("?").join(", ")});
      `,
      ids,
      { prepare: true }
    );
  }
}

export default new User();
