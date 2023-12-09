import BaseRoutes from "../base/router";
import Controller from "../controllers/user";
import authentication from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

class Routes extends BaseRoutes {
  routes(): void {
    this.router
      .get("/multiple", authorization, Controller.getMultipleByIds)
      .get(
        "/following-recomendation",
        authentication,
        Controller.getUserFollowingRecomendation
      )
      .get("/me", authentication, Controller.getUserData)
      .get("/:id", authentication, Controller.getUserById);
  }
}

export default new Routes().router;
