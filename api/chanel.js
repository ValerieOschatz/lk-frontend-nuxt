import { instance } from "./instanceAxios"

export const getChanelListApi = ({ owner, name, subscriptions }) =>
  instance.get("/chanel/list", {
    params: {
      owner,
      name,
      subscriptions,
    },
  }
);

export const getChanelCardApi = ({ chanelId }) =>
  instance.get("/chanel/card", {
    params: {
      chanelId,
    },
  }
);

export const createChanelApi = ({ name, description }) => {
  return instance.post("/chanel/create", {
    name,
    description,
  });
};
