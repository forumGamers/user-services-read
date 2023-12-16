import user from "../interfaces/user";
import RabbitMQProperty from "./constant";
import User from "../database/user";

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
          user.following = [] as string[];
          user.followers = [] as string[];
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
          const token = JSON.parse(msg.content.toString());
          await User.updateToken({
            access_token: token.access_token,
            token_as: token.as,
            id: token.user_id,
          });
          this.channel.ack(msg);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  public async consumeChangeProfileImg() {
    this.channel.consume(this.userChangeProfile, async (msg) => {
      try {
        if (msg) {
          const data: user = JSON.parse(msg.content.toString());
          await User.updateUserImage(data.id, data.image_url, data.image_id);
          this.channel.ack(msg);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  public async consumeChangeBackgroundImg() {
    this.channel.consume(this.userChangeBackground, async (msg) => {
      try {
        if (msg) {
          const data: user = JSON.parse(msg.content.toString());
          await User.updateUserImage(
            data.id,
            data.background_url,
            data.background_id
          );
          this.channel.ack(msg);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
}

export default new UserConsumer();
