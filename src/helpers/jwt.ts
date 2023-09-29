import {
  JwtPayload,
  Secret,
  verify,
  decode,
  DecodeOptions,
} from "jsonwebtoken";

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

  public decodeToken(token: string, opts?: DecodeOptions) {
    return decode(token, opts) as jwtValue;
  }
}

export default new JWT();
