import { instance, token } from "./instanceAxios"

export const getProfileApi = () =>
  instance.get("/profile/me", {});
