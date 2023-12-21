import { instance } from "./instanceAxios"

export const checkChatApi = ({ participant }) =>
  instance.get("/chat/check", {
    params: {
      participant,
    },
  }
);

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

export const deleteChatApi = ({ chatId }) => {
  return instance.delete("/chat/delete", {
    params: {
      chatId,
    }
  });
};
