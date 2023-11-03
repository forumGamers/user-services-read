import cassandra from "../database";

(async function () {
  switch (process.argv[2]) {
    case "up":
      await cassandra.execute(
        `CREATE INDEX IF NOT EXISTS ON users (access_token);`
      );
      break;
    case "down":
      await cassandra.execute(`DROP INDEX IF EXISTS ON users (access_token)`);
  }
})();
