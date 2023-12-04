import { instance } from "./instanceAxios"

export const getProfileApi = () => instance.get("/profile/me", {});

export const updateProfilePhotoApi = (data) => {
  return instance.patch("/profile/photo", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
