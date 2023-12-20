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

export const updateMessageApi = ({ messageId, text }) => {
  return instance.patch("/message/update", {
    messageId,
    text,
  });
};

export const deleteMessageApi = ({ messageId }) => {
  return instance.delete("/message/delete", {
    params: {
      messageId,
    }
  });
};
