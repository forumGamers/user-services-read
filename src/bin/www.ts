import { config } from "dotenv";

config();

import app from "..";
import broker from "../broker/user";

(async () => {
  try {
    await broker.connect();
    broker.ConsumeNewUser();
    broker.ConsumeLoginUser();
    broker.consumeChangeProfileImg();
    broker.consumeChangeBackgroundImg();
    broker.consumeChangeUserInfo();

    const port = process.env.PORT ?? 3002;

    app.listen(port, () => console.log(`app listening on port ${port}`));
  } catch (err) {
    throw err;
  }
})();
