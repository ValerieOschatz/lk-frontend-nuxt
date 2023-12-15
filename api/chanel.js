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

export const updateChanelPhotoApi = (data) => {
  return instance.patch("/chanel/photo", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateChanelInfoApi = ({ chanelId, name, description }) => {
  return instance.patch("/chanel/info", {
    chanelId,
    name,
    description,
  });
};

export const updateChanelPrivatSettingsApi = ({ chanelId, comments, posts }) => {
  return instance.patch("/chanel/privat-settings", {
    chanelId,
    comments,
    posts,
  });
};

export const deleteChanelApi = ({ chanelId }) => {
  return instance.delete("/chanel/delete", {
    params: {
      chanelId,
    }
  });
};
