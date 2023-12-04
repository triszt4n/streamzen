export interface User {
  id: number;
  authSchId: string;
  firstName: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
  createdVods?: Vod[];
  createdCollections?: Collection[];
  createdLives?: Live[];
}

export interface Collection {
  id: number;
  title: string;
  descMarkdown: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: number;
  vods?: Vod[];
}

export interface Vod {
  id: number;
  title: string;
  descMarkdown: string;
  originalDate: Date;
  folderName: string;
  fileName: string;
  ext: string;
  state: "UNPROCESSED" | "PROCESSING" | "PROCESSED" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
  collectionId?: number;
  collection?: Collection;
  createdBy?: User;
}

export interface CreateVodDto {
  title: string;
  descMarkdown: string;
  originalDate: string;
  folderName: string;
  fileName: string;
  ext: string;
  // collectionId?: number; // todo később
}

// todo check if this is correct
export interface UpdateLiveDto {
  title?: string;
  descMarkdown?: string;
  airDate?: Date;
  liveType?: "LOCAL_RTMP" | "EMBED_YOUTUBE" | "EMBED_TWITCH";
  embedUrl?: string;
  localRtmpUrl?: string;
  localRtmpStreamKey?: string;
}

// todo check if this is correct
export interface UpdateVodDto {
  title?: string;
  descMarkdown?: string;
  collectionId?: number;
}

// todo check if this is correct
export interface CreateLiveDto {
  title: string;
  descMarkdown: string;
  airDate: Date;
  liveType: "LOCAL_RTMP" | "EMBED_YOUTUBE" | "EMBED_TWITCH";
  embedUrl?: string;
  localRtmpUrl?: string;
  localRtmpStreamKey?: string;
}

export interface Live {
  id: number;
  title: string;
  descMarkdown: string;
  airDate: Date;
  state: "PREMIERE" | "ON_AIR" | "OFF_AIR";
  liveType: "LOCAL_RTMP" | "EMBED_YOUTUBE" | "EMBED_TWITCH";
  embedUrl?: string;
  localRtmpUrl?: string;
  localRtmpStreamKey?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById: number;
}
