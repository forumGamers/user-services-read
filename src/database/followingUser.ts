import Cassandra from ".";

class FollowingUser extends Cassandra {
  constructor() {
    super();
  }

  public async checkIsFollow(ids: string[]) {
    return await this.client.execute(
      `
        SELECT id, target, user_id
        FROM following_users
        WHERE target IN (${Array(ids.length).fill("?").join(", ")}) ALLOW FILTERING;
        `,
      ids,
      { prepare: true }
    );
  }
}

export default new FollowingUser();
