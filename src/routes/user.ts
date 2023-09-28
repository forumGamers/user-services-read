import BaseRoutes from "../base/router";
import Controller from "../controllers/user";

class Routes extends BaseRoutes {
  routes(): void {
    this.router.get("/multiple", Controller.getMultipleByIds);
  }
}

export default new Routes().router;
