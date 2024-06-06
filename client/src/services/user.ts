import { Config } from "../configs/configs";
import { IUser } from "../types/types";

export const createUser = async (user: IUser) => {
  const createUserFormData = new FormData();
  createUserFormData.append("username", user.login);
  createUserFormData.append("password", user.password);

  const response = await fetch(`${Config.serverUrl}/register.php/`, {
    method: "POST",
    body: createUserFormData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const loginUser = async (user: IUser) => {
  const createUserFormData = new FormData();
  createUserFormData.append("username", user.login);
  createUserFormData.append("password", user.password);

  const response = await fetch(`${Config.serverUrl}/login.php/`, {
    method: "POST",
    body: createUserFormData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
