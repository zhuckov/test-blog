import { Config } from "../configs/configs";
import { IPost } from "../types/types";

export const createPost = async (formData: FormData) => {
  const response = await fetch(`${Config.serverUrl}/create_post.php`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
