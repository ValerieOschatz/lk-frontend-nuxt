import { instance, token } from "./instanceAxios"

export const loginUserApi = ({ login, password }) => {
  return instance.post("/auth/login", {
    login,
    password,
  });
};

export const registerApi = ({ name, login, password }) => {
  return instance.post("/auth/register", {
    name,
    login,
    password,
  });
};
