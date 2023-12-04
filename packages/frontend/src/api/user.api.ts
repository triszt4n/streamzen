import axios from "axios";
import { User } from "./types";

export class UserApi {
  private static instance: UserApi;

  private constructor() {}

  static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }
    return UserApi.instance;
  }

  async fetchCurrentUser() {
    const response = await axios.get<User & { jwt?: string }>(
      "/api/users/profile",
    );
    return response.data;
  }

  async getAllUsers() {
    const response = await axios.get<User[]>("/api/users");
    return response.data.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    }));
  }
}
