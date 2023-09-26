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
            role
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
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
      ]
    );
  }
}

export default new User();
