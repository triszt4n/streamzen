import axios from "axios";

export interface User {
  id: number;
  authSchId: string;
  firstName: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

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
}
