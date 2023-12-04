import axios from "axios";
import { Collection, CreateVodDto, Live, Vod } from "./types";

export class VideoApi {
  private static instance: VideoApi;

  private constructor() {}

  static getInstance(): VideoApi {
    if (!VideoApi.instance) {
      VideoApi.instance = new VideoApi();
    }
    return VideoApi.instance;
  }

  async getPublicVideoList(): Promise<{
    vods: Vod[];
    lives: Live[];
    collections: Collection[];
  }> {
    const response = await axios.get<{
      vods: Vod[];
      lives: Live[];
      collections: Collection[];
    }>("/api/videos/public");
    return {
      vods: response.data.vods.map((vod) => ({
        ...vod,
        originalDate: new Date(vod.originalDate),
        createdAt: new Date(vod.createdAt),
        updatedAt: new Date(vod.updatedAt),
      })),
      lives: response.data.lives.map((live) => ({
        ...live,
        originalDate: new Date(live.airDate),
        createdAt: new Date(live.createdAt),
        updatedAt: new Date(live.updatedAt),
      })),
      collections: response.data.collections.map((collection) => ({
        ...collection,
        createdAt: new Date(collection.createdAt),
        updatedAt: new Date(collection.updatedAt),
      })),
    };
  }

  async getAllVideoList(): Promise<{
    vods: Vod[];
    lives: Live[];
  }> {
    const response = await axios.get<{
      vods: Vod[];
      lives: Live[];
    }>("/api/videos");
    return {
      vods: response.data.vods!.map((vod) => ({
        ...vod,
        originalDate: new Date(vod.originalDate),
        createdAt: new Date(vod.createdAt),
        updatedAt: new Date(vod.updatedAt),
      })),
      lives: response.data.lives!.map((live) => ({
        ...live,
        originalDate: new Date(live.airDate),
        createdAt: new Date(live.createdAt),
        updatedAt: new Date(live.updatedAt),
      })),
    };
  }

  async getVodList(): Promise<Vod[]> {
    const response = await axios.get<Vod[]>("/api/videos/vods");
    return response.data.map((vod) => ({
      ...vod,
      originalDate: new Date(vod.originalDate),
      createdAt: new Date(vod.createdAt),
      updatedAt: new Date(vod.updatedAt),
    }));
  }

  async getLiveList(): Promise<Live[]> {
    const response = await axios.get<Live[]>("/api/videos/lives");
    return response.data.map((live) => ({
      ...live,
      originalDate: new Date(live.airDate),
      createdAt: new Date(live.createdAt),
      updatedAt: new Date(live.updatedAt),
    }));
  }

  async getVodById(id: number): Promise<Vod> {
    const response = await axios.get<Vod>(`/api/videos/vods/${id}`);
    return {
      ...response.data,
      originalDate: new Date(response.data.originalDate),
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  }

  async getLiveById(id: number): Promise<Live> {
    const response = await axios.get<Live>(`/api/videos/lives/${id}`);
    return {
      ...response.data,
      airDate: new Date(response.data.airDate),
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  }

  async getFolderNames(): Promise<string[]> {
    const response = await axios.get<string[]>("/api/videos/vods/folder-names");
    return response.data;
  }

  async uploadVideo(file: File, dto: CreateVodDto): Promise<Vod> {
    const formData = new FormData();
    const savedFileName = `${dto.folderName}_${dto.fileName}.${dto.ext}`;
    formData.append("file", file, savedFileName);
    formData.append("title", dto.title);
    formData.append("descMarkdown", dto.descMarkdown);
    formData.append("originalDate", dto.originalDate);
    formData.append("folderName", dto.folderName);
    formData.append("fileName", dto.fileName);
    formData.append("ext", dto.ext);

    const response = await axios.post<Vod>("/api/videos/vods", formData);
    return response.data;
  }

  async startProcess(id: number): Promise<void> {
    await axios.post(`/api/videos/vods/${id}/processing`);
  }

  async getProcessPercent(id: number): Promise<number> {
    const response = await axios.get<number>(
      `/api/videos/vods/${id}/processing`,
    );
    return response.data;
  }
}
