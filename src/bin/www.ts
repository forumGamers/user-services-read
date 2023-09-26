import { config } from "dotenv";

config();

import app from "..";
import broker from "../broker";
import cassandra from "../database";

(async function () {
  try {
    await broker.connect();
    await cassandra.createKeySpace();
    await cassandra.createTableUser();
    await cassandra.createTableToken();
    broker.ConsumeNewUser();
    broker.ConsumeLoginUser();

    const port = process.env.PORT ?? 3002;

    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (err) {
    throw err;
  }
})();
