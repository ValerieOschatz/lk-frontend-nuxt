import { instance } from "./instanceAxios"

export const getProfileApi = () => instance.get("/profile/me", {});

export const updateProfilePhotoApi = (data) => {
  return instance.patch("/profile/photo", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProfileInfoApi = ({ name, description}) => {
  return instance.patch("/profile/info", {
    name,
    description,
  });
};
