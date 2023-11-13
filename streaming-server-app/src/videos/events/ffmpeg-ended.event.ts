export default class FfmpegEndedEvent {
  payload: any;
  videoId: number;

  constructor(input: FfmpegEndedEvent) {
    this.payload = input.payload;
    this.videoId = input.videoId;
  }
}
