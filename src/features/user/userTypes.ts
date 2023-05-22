import { UserInfo } from "firebase/auth";
import { IIntegration } from "../integrations/integrationTypes";

export interface IsendAsyncIntegrationRequest {
  code: string;
  type: string;
  user: UserInfo;
}

enum ACCOUNT_TYPE {
  FREE,
  PREMIUM
}

export type IUser = {
  _id: string,
  uid: string;
  email: string;
  username: string;
  accountType?: ACCOUNT_TYPE
  integrations?: IIntegration[];
}