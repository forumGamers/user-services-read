import { Client } from "cassandra-driver";
import AppError from "../base/error";

export default class Cassandra {
  protected client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ["localhost"],
      localDataCenter: "DC-primary",
      keyspace: "user_service",
    });
  }

  private async createKeySpace() {
    try {
      await this.client.execute(
        `CREATE KEYSPACE IF NOT EXISTS "user_service"
        WITH replication = {
        'class': 'SimpleStrategy',
        'replication_factor': 1
        };
    `,
      );
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }

  private async createTableUser() {
    try {
      await this.client.execute(
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
        );`,
      );
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }

  public async initDatabase() {
    await this.createKeySpace();
    await this.createTableUser();
  }
}
