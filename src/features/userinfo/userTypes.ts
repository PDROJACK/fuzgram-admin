import { UserInfo } from "firebase/auth";

export interface IsendAsyncIntegrationRequest {
  code: string;
  type: string;
  user: UserInfo;
}
