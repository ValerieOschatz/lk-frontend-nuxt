import { instance } from "./instanceAxios"

export const getProfileApi = () => instance.get("/profile/me", {});

export const updateProfilePhotoApi = (data) => {
  return instance.patch("/profile/photo", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProfileInfoApi = ({ name, description }) => {
  return instance.patch("/profile/info", {
    name,
    description,
  });
};

export const updateProfilePrivatSettingsApi = ({ comments, posts }) => {
  return instance.patch("/profile/privat-settings", {
    comments,
    posts,
  });
};

export const subscribeApi = (userId) => {
  return instance.put("/profile/subscribe", {
    userId,
  });
};

export const unsubscribeApi = (userId) => {
  return instance.delete("/profile/subscribe", {
    params: {
      userId,
    }
  });
};
