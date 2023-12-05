import axios from "axios";
import { Collection, CreateCollectionDto } from "./types";

export class CollectionApi {
  private static instance: CollectionApi;

  private constructor() {}

  static getInstance(): CollectionApi {
    if (!CollectionApi.instance) {
      CollectionApi.instance = new CollectionApi();
    }
    return CollectionApi.instance;
  }

  async getCollection(id: string): Promise<Collection> {
    const response = await axios.get<Collection>(`/api/collections/${id}`);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
      vods: response.data.vods?.map((vod) => ({
        ...vod,
        originalDate: new Date(vod.originalDate),
        createdAt: new Date(vod.createdAt),
        updatedAt: new Date(vod.updatedAt),
      })),
    };
  }

  async createCollection(dto: CreateCollectionDto): Promise<Collection> {
    const response = await axios.post<Collection>("/api/collections", dto);
    return {
      ...response.data,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  }

  async bulkAdd(collectionId: string, vodIds: number[]) {
    await axios.post(`/api/collections/${collectionId}/bulk-add`, vodIds);
  }
}
