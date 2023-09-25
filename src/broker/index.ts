import { connect } from "amqplib";
import AppError from "../base/error";
import user from "../interfaces/model";
import RabbitMQProperty from "./constant";
import cassandra from "../database";

class RabbitMQ extends RabbitMQProperty {
  public async connect() {
    try {
      this.connection = await connect(`${this.connectionString}?heartbeat=10`);

      this.channel = await this.connection.createChannel();
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }

  constructor() {
    super();
  }

  public ConsumeNewUser() {
    this.channel.consume(this.newUserQueue, async (msg) => {
      if (msg) {
        const user: user = JSON.parse(msg.content.toString());

        user.created_at = new Date(user.created_at);
        user.updated_at = new Date(user.updated_at);
        user.division = "" as any;
        user.role = "" as any;
        console.log({ user });
        await cassandra.insertOne(user);
        this.channel.ack(msg);
      }
    });
  }
}

export default new RabbitMQ();
