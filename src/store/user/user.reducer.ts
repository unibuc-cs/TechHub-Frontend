import { ActionWithPayload, UserLoginInformation } from "../store";

const initialState: UserLoginInformation = { accessToken: "" };

const userReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
