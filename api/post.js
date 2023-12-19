import { instance } from "./instanceAxios";

export const getPostListApi = ({ owner, ownerChanel, tape }) =>
  instance.get("/post/list", {
    params: {
      owner,
      ownerChanel,
      tape,
    },
  }
);

export const createPostApi = (data) => {
  return instance.post("/post/create", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updatePostApi = ({ postId, text }) => {
  return instance.patch("/post/text", {
    postId,
    text,
  });
};

export const deletePostApi = ({ postId }) => {
  return instance.delete("/post/delete", {
    params: {
      postId,
    }
  });
};

export const addLikePostApi = (postId) => {
  return instance.put("/post/like", {
    postId,
  });
};

export const deleteLikePostApi = (postId) => {
  return instance.delete("/post/like", {
    params: {
      postId,
    }
  });
};
