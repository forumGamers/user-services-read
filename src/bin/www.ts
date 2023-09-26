import { config } from "dotenv";

config();

import app from "..";
import broker from "../broker/user";
import Cassandra from "../database";

(async function () {
  try {
    await broker.connect();
    await new Cassandra().initDatabase();
    broker.ConsumeNewUser();
    broker.ConsumeLoginUser();

    const port = process.env.PORT ?? 3002;

    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (err) {
    throw err;
  }
})();
