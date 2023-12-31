import { AdminAccount, SellerAccount, UserAccount } from "../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user: {
        loggedAs: "User" | "Admin" | "Seller" | null;
        author: UserAccount | AdminAccount | SellerAccount | null | undefined;
      };
    }
  }
}
