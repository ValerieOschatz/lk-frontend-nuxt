import { instance } from "./instanceAxios"

export const createMessageApi = ({ text, chat }) => {
  return instance.post("/message/create", {
    text,
    chat,
  });
};
