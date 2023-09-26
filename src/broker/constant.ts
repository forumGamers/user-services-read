import { Channel, Connection, connect } from "amqplib";
import AppError from "../base/error";

export default abstract class RabbitMQProperty {
  protected connection!: Connection;
  protected channel!: Channel;
  protected connectionString =
    (process.env.RABBITMQURL as string) ||
    "amqp://user:password@localhost:5673";

  protected newUserQueue = "New-User-Queue";
  protected loginUserQueue = "Login-User-Queue";

  public async connect() {
    try {
      this.connection = await connect(`${this.connectionString}?heartbeat=10`);

      this.channel = await this.connection.createChannel();
    } catch (err) {
      throw new AppError({ message: err as any, statusCode: 502 });
    }
  }
}
