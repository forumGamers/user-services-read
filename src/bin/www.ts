import { config } from "dotenv";

config();

import app from "..";
import broker from "../broker";

(async function () {
  try {
    await broker.connect();
    const port = process.env.PORT ?? 3002;

    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (err) {
    throw err;
  }
})();
