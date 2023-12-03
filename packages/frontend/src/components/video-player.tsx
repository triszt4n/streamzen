import Hls from "hls.js";
import React, { useEffect } from "react";

interface Props {
  src: string;
  width?: number;
  height?: number;
}

export const VideoPlayer: React.FC<Props> = ({
  src,
  width = 640,
  height = 360,
}) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current && Hls.isSupported()) {
      const hls = new Hls();

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("video and hls.js are now bound together !");
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        console.log(
          "manifest loaded, found " + data.levels.length + " quality level",
        );
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.log("HLS ERROR", event, data);
      });

      hls.loadSource(src);
      hls.attachMedia(ref.current);
    }
  }, [src]); // todo hls.destroy() on unmount

  return (
    <video width={width} height={height} controls ref={ref}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
