import BaseRoutes from "../base/router";
import user from "./user";

class Routes extends BaseRoutes {
  routes(): void {
    this.router.use("/user", user);
  }
}

export default new Routes().router;
