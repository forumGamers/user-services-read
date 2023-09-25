import { Channel, Connection } from "amqplib";

export default abstract class RabbitMQProperty {
  protected connection!: Connection;
  protected channel!: Channel;
  protected connectionString =
    (process.env.RABBITMQURL as string) ||
    "amqp://user:password@localhost:5673";

  protected newUserQueue = "New-User-Queue";
}
