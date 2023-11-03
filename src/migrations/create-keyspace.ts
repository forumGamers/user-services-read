import cassandra from "../database";

(async function () {
  switch (process.argv[2]) {
    case "up":
      await cassandra.execute(
        `CREATE KEYSPACE IF NOT EXISTS "user_service"
                  WITH replication = {
                  'class': 'SimpleStrategy',
                  'replication_factor': 1
                  };
              `
      );
      break;
    default:
      break;
  }
})();
