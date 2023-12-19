import { instance } from "./instanceAxios"

export const getChatCardApi = ({ chatId }) =>
  instance.get("/chat/card", {
    params: {
      chatId,
    },
  }
);

export const createChatApi = ({ otherParticipants }) => {
  return instance.post("/chat/create", {
    otherParticipants,
  });
};
