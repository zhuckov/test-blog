import { Config } from "../configs/configs";
interface getQueryProps {
  limit: number;
  page: number;
}
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

export const getPosts = async ({ limit, page }: getQueryProps) => {
  const response = await fetch(`${Config.serverUrl}/get_posts.php/?page=${page}&limit=${limit}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении постов");
  }

  const data = await response.json();
  return data;
};

export const deletePost = async (formData: FormData) => {
  const response = await fetch(`${Config.serverUrl}/delete_post.php`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Ошибка при удалении товара");
  }
};

export const getPostByUserLogin = async (formData: FormData) => {
  const response = await fetch(`${Config.serverUrl}/get_users_post.php`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении постов пользователя");
  }

  const data = await response.json();
  return data;
};
