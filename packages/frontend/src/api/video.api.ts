import axios from "axios";

export interface Video {
  id: number;
  title: string;
  src: string;
  customUrl: string;
}

export class VideoApi {
  private static instance: VideoApi;

  private constructor() {}

  static getInstance(): VideoApi {
    if (!VideoApi.instance) {
      VideoApi.instance = new VideoApi();
    }
    return VideoApi.instance;
  }

  async getVideoList(): Promise<Video[]> {
    const response = await axios.get<Video[]>("/videos");
    return response.data;
  }

  async getVideoById(id: number): Promise<Video> {
    const response = await axios.get<Video>(`/videos/${id}`);
    return response.data;
  }
}
