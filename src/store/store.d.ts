export type ActionWithPayload<TPayload> = {
  type: string;
  payload: TPayload;
};

export interface UserLoginInformation {
  accessToken: { accessToken: string };
  didRegister: boolean;
}

export interface Store {
  user: UserLoginInformation;
}
