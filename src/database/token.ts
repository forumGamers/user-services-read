import Cassandra from ".";
import token from "../interfaces/token";

class Token extends Cassandra {
  constructor() {
    super();
  }

  public async insertOne({
    access_token,
    user_id,
    as,
    created_at,
    updated_at,
  }: token) {
    return await this.client.execute(
      `INSERT INTO tokens (
        access_token,
        user_id,
        as,
        created_at,
        updated_at
    ) VALUES (?, ?, ?, ?, ?);`,
      [access_token, user_id, as, created_at, updated_at]
    );
  }
}

export default new Token();
