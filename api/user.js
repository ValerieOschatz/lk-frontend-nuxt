import { instance } from "./instanceAxios"

export const getUserListApi = ({ name, subscribers, subscriptions }) =>
  instance.get("/user/list", {
    params: {
      name,
      subscribers,
      subscriptions,
    },
  }
);

export const getUserCardApi = ({ userId }) =>
  instance.get("/user/card", {
    params: {
      userId,
    },
  }
);
