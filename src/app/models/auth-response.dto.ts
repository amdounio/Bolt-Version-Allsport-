import { User } from "./user.model";

export interface AuthenticationResponse {
  user: User;
  idToken: string;
  token? : string;
  newUser? : boolean;

}
