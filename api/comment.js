import { instance } from "./instanceAxios";

export const createCommentApi = ({ post, text }) => {
  return instance.post("/post/create", {
    post,
    text,
  });
};

// export const getPostListApi = ({ owner, ownerChanel }) =>
//   instance.get("/post/list", {
//     params: {
//       owner,
//       ownerChanel,
//     },
//   }
// );
