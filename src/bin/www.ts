import { config } from "dotenv";

config();

import app from "..";
import broker from "../broker";
import cassandra from "../database";

(async function () {
  try {
    await broker.connect();
    broker.ConsumeNewUser();
    await cassandra.createKeySpace();
    await cassandra.createTable();

    const port = process.env.PORT ?? 3002;

    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (err) {
    throw err;
  }
})();
