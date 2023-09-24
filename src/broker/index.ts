import { Channel, connect, Connection } from "amqplib";
import AppError from "../base/error";

abstract class RabbitMQProperty {
  protected connection!: Connection;
  protected channel!: Channel;
  protected connectionString =
    (process.env.RABBITMQURL as string) ||
    "amqp://user:password@localhost:5673";
}

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
}

export default new RabbitMQ();
