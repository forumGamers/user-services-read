export default interface Token {
  access_token: string;
  user_id: string;
  as: "User" | "Admin" | "Seller";
  created_at: Date;
  updated_at: Date;
}
