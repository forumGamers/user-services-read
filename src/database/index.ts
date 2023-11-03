import { Client } from "cassandra-driver";
import path from "path";
import { config } from "dotenv";

config();

export default new (class Cassandra {
  public client = new Client({
    keyspace: "user_service",
    credentials: {
      username: process.env.CASSANDRA_USERNAME as string,
      password: process.env.CASSANDRA_PASSWORD as string,
    },
    cloud: {
      secureConnectBundle: path.join(
        __dirname,
        "../../etc/secure-connect-forum-gamers-testing.zip"
      ),
    },
  });
})().client;
