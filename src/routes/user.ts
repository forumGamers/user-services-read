import BaseRoutes from "../base/router";
import Controller from "../controllers/user";
import authorization from "../middlewares/authorization";

class Routes extends BaseRoutes {
  routes(): void {
    this.router.get("/multiple", authorization, Controller.getMultipleByIds);
  }
}

export default new Routes().router;
