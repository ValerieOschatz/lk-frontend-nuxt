import instance from "./instanceAxios";

export const loginUser = ({ login, password }) => {
  return instance.post("/auth/login", {
    login,
    password,
  });
};
