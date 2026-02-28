"use client";
import { useState } from "react";

type YoutubeProps = {
  videoId: string;
  start?: number;
};

export default function YouTubeEmbed({ videoId, start = 0 }: YoutubeProps) {
  const [playing, setPlaying] = useState(false);

  const embedSrc = `https://www.youtube.com/embed/${videoId}?start=${start}&playsinline=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center"
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt="YouTube thumbnail"
            className="h-full w-full object-cover"
          />

          {/* Play button */}
          <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-black/70 transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      ) : (
        <iframe
          src={embedSrc}
          className="absolute inset-0 h-full w-full"
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
