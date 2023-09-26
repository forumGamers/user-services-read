import { Client } from "cassandra-driver";
import AppError from "../base/error";
import user, { Token } from "../interfaces/model";

class Cassandra {
  private client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ["localhost"],
      localDataCenter: "DC-primary",
      keyspace: "user_service",
    });
  }

  public async createKeySpace() {
    try {
      await this.client.execute(
        `CREATE KEYSPACE IF NOT EXISTS "user_service"
        WITH replication = {
        'class': 'SimpleStrategy',
        'replication_factor': 1
        };
    `
      );
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }

  public async createTableUser() {
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
            role TEXT
        );`
      );
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }

  public async createTableToken() {
    try {
      await this.client.execute(
        `CREATE TABLE IF NOT EXISTS tokens (
            access_token TEXT PRIMARY KEY,
            user_id UUID,
            as TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
        );`
      );
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }

  public async insertOne({
    id,
    fullname,
    username,
    password,
    is_verified,
    bio,
    image_url,
    background_url,
    status,
    created_at,
    updated_at,
    store_id,
    division,
    role,
  }: user) {
    return await this.client.execute(
      `INSERT INTO users (
        id, 
        fullname, 
        username, 
        password, 
        is_verified, 
        bio, 
        image_url, 
        background_url, 
        status, 
        created_at, 
        updated_at, 
        store_id, 
        division, 
        role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        id,
        fullname,
        username,
        password,
        is_verified,
        bio,
        image_url,
        background_url,
        status,
        created_at,
        updated_at,
        store_id,
        division,
        role,
      ]
    );
  }

  public async insertOneToken({
    access_token,
    user_id,
    as,
    created_at,
    updated_at,
  }: Token) {
    return await this.client.execute(
      `INSERT INTO tokens (
        access_token,
        user_id,
        as,
        created_at,
        updated_at
    ) VALUES (?, ?, ?, ?, ?);`,
      [access_token, user_id, as, created_at, updated_at]
    );
  }
}

export default new Cassandra();
