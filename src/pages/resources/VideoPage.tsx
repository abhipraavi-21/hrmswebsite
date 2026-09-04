import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Film, Play } from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { usePublicContent } from "@/hooks/usePublicContent";
import type { PublicResourceVideo } from "@/services/cmsTypes";
import { fallbackResourceVideos, fetchPublicVideos } from "@/services/videoService";

function getEmbedUrl(video: PublicResourceVideo) {
  return `https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

function getSourceLabel(video: PublicResourceVideo) {
  if (video.videoSource === "youtube") {
    return "YouTube";
  }

  if (video.videoSource === "upload") {
    return "Uploaded";
  }

  return "Video";
}

function getVideoDescription(video: PublicResourceVideo) {
  return video.description || "Play this video directly on the page.";
}

function getVideoThumbnail(video: PublicResourceVideo) {
  if (video.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  return video.videoSource === "youtube" && video.videoId
    ? `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
    : "";
}

function VideoPreview({
  video,
  isActive,
  onPlay,
  onClose,
}: {
  video: PublicResourceVideo;
  isActive: boolean;
  onPlay: () => void;
  onClose: () => void;
}) {
  const thumbnail = getVideoThumbnail(video);

  if (isActive && video.videoSource === "youtube" && video.videoId) {
    return (
      <>
        <iframe
          src={getEmbedUrl(video)}
          title={video.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <CloseVideoButton onClose={onClose} />
      </>
    );
  }

  if (isActive && video.videoSource !== "youtube") {
    return (
      <>
        <video
          src={video.videoUrl}
          poster={thumbnail || undefined}
          className="absolute inset-0 h-full w-full bg-black object-contain"
          controls
          autoPlay
          playsInline
        />
        <CloseVideoButton onClose={onClose} />
      </>
    );
  }

  return (
    <>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={video.thumbnailAlt || video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      ) : video.videoSource !== "youtube" && video.videoUrl ? (
        <video
          src={video.videoUrl}
          className="h-full w-full bg-black object-cover"
          preload="metadata"
          muted
          playsInline
        />
      ) : (
        <div className="grid h-full place-items-center bg-primary-soft text-primary">
          <Film className="h-10 w-10" />
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,39,0.02),rgba(7,18,39,0.24))]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={onPlay}
          className="grid h-18 w-18 place-items-center rounded-full border border-white/35 bg-white/88 text-primary shadow-[0_16px_36px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2"
          aria-label={`Play ${video.title}`}
        >
          <Play className="h-7 w-7 fill-current" />
        </button>
      </div>
    </>
  );
}

function CloseVideoButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute right-4 top-4 rounded-full bg-black/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white shadow-sm transition hover:bg-black"
    >
      Close
    </button>
  );
}

function VideoCard({
  video,
  isActive,
  onPlay,
  onClose,
}: {
  video: PublicResourceVideo;
  isActive: boolean;
  onPlay: () => void;
  onClose: () => void;
}) {
  return (
    <article className="group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,79,209,0.10),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.12),_rgba(11,92,255,0.04))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[2rem] bg-surface">
          <VideoPreview video={video} isActive={isActive} onPlay={onPlay} onClose={onClose} />
          <div className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white shadow-sm">
            {getSourceLabel(video)}
          </div>
        </div>

        <div className="flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
            {video.label || "Featured video"}
          </div>

          <div className="mt-4 flex flex-1 items-start gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-[1.02rem] font-semibold leading-7 tracking-tight text-ink sm:text-[1.08rem]">
                {video.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft">
                {getVideoDescription(video)}
              </p>
            </div>

            <div className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/10 bg-primary-soft text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Play inline
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Click play
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function VideoPage() {
  const location = useLocation();
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const seedVideos = useMemo(() => fallbackResourceVideos, []);
  const { data, error, loading } = usePublicContent(
    () => fetchPublicVideos(),
    [],
    seedVideos,
  );
  const videos = data ?? seedVideos;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.09),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f6fbff_100%)]">
      <PageSEO
        title="Video | Altroz HRMS"
        description="Watch published Altroz HRMS resource videos, product walkthroughs, and help content."
        canonicalPath={location.pathname}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="section py-14 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Video resources
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Video
              </h1>
              {loading ? (
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Loading the latest published videos...
                </p>
              ) : null}
              {error ? (
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Showing saved fallback videos while the live video feed is unavailable.
                </p>
              ) : null}
            </div>

            {videos.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    isActive={activeVideoId === video.id}
                    onPlay={() => setActiveVideoId(video.id)}
                    onClose={() => setActiveVideoId(null)}
                  />
                ))}
                {videos.length % 3 === 2 ? (
                  <div className="hidden min-h-[28rem] lg:block" aria-hidden="true" />
                ) : null}
              </div>
            ) : (
              <div className="soft-card p-8 text-center">
                <div className="text-lg font-bold text-ink">No videos published yet</div>
                <p className="mt-2 text-sm leading-7 text-ink-soft">
                  Published videos added from the admin panel will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
