import { instance } from "./instanceAxios"

export const getMessageListApi = ({ chat }) =>
  instance.get("/message/list", {
    params: {
      chat,
    },
  }
);

export const createMessageApi = ({ text, chat }) => {
  return instance.post("/message/create", {
    text,
    chat,
  });
};
