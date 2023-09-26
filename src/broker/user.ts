import user from "../interfaces/user";
import RabbitMQProperty from "./constant";
import User from "../database/user";
import token from "../interfaces/token";
import Token from "../database/token";

class UserConsumer extends RabbitMQProperty {
  constructor() {
    super();
  }

  public ConsumeNewUser() {
    this.channel.consume(this.newUserQueue, async (msg) => {
      try {
        if (msg) {
          const user: user = JSON.parse(msg.content.toString());

          user.created_at = new Date(user.created_at);
          user.updated_at = new Date(user.updated_at);
          user.division = "" as any;
          user.role = "" as any;
          await User.insertOne(user);
          this.channel.ack(msg);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  public ConsumeLoginUser() {
    this.channel.consume(this.loginUserQueue, async (msg) => {
      try {
        if (msg) {
          const token: token = JSON.parse(msg.content.toString());

          token.created_at = new Date(token.created_at);
          token.updated_at = new Date(token.updated_at);
          await Token.insertOne(token);
          this.channel.ack(msg);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
}

export default new UserConsumer();
