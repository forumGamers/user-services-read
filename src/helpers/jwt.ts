import { JwtPayload, Secret, verify } from "jsonwebtoken";

export interface jwtValue extends JwtPayload {
  UUID: string;
  loggedAs: "User" | "Admin" | "Seller";
}

class JWT {
  private secret: Secret;

  constructor() {
    this.secret = process.env.SECRET as Secret;
  }

  public verifyToken(token: string) {
    return verify(token, this.secret) as jwtValue;
  }
}

export default new JWT();
