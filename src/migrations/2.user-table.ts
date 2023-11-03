import cassandra from "../database";

(async function () {
  switch (process.argv[2]) {
    case "up":
      await cassandra.execute(
        `CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            fullname TEXT,
            username TEXT,
            email TEXT,
            password TEXT,
            is_verified BOOLEAN,
            bio TEXT,
            image_url TEXT,
            image_id TEXT,
            background_url TEXT,
            background_id TEXT,
            status TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            store_id UUID,
            division TEXT,
            role TEXT,
            following SET<UUID>,
            followers SET<UUID>,
            access_token TEXT,
            token_as TEXT
        );`
      );
      break;
    case "down":
      await cassandra.execute(`DROP TABLE IF EXISTS users;`);
      break;
    default:
      break;
  }
  await cassandra.shutdown();
})();
