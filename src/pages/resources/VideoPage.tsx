import { useLocation } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/channel/UCvht-kbPRfOLllLrxt2v4pQ";

const featuredVideos = [
  {
    label: "Featured video",
    title: "Leave Management Software: Simplify Employee Leave Approvals | Altroz HR | #leavemanagement #hrms",
    thumbnail: "https://i.ytimg.com/vi/gYLKTRQ1Hwo/hqdefault.jpg",
  },
  {
    label: "Featured video",
    title: "Update tenant configuration",
    thumbnail: "https://i.ytimg.com/vi/nkFBzliqulI/hqdefault.jpg",
  },
];

export default function VideoPage() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.09),_transparent_34%),linear-gradient(180deg,_#ffffff_0%,_#f6fbff_100%)]">
      <PageSEO
        title="Video | Altroz HRMS"
        description="Video page for Altroz HRMS."
        canonicalPath={location.pathname}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="section py-14 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                YouTube channel
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Video
              </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredVideos.map((video) => (
                <a
                  key={video.title}
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-[0_30px_80px_rgba(15,23,42,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2"
                  aria-label={`Open YouTube channel from ${video.title}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,79,209,0.10),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.12),_rgba(11,92,255,0.04))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="relative overflow-hidden rounded-t-[2rem] bg-surface">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="aspect-[16/9] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,39,0.02),rgba(7,18,39,0.24))]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid h-18 w-18 place-items-center rounded-full border border-white/35 bg-white/88 text-primary shadow-[0_16px_36px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                          <Play className="h-7 w-7 fill-current" />
                        </div>
                      </div>
                      <div className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-white shadow-sm">
                        YouTube
                      </div>
                    </div>

                    <div className="flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
                        {video.label}
                      </div>

                      <div className="mt-4 flex flex-1 items-start gap-4">
                        <div className="min-w-0 flex-1">
                          <h2 className="text-[1.02rem] font-semibold leading-7 tracking-tight text-ink sm:text-[1.08rem]">
                            {video.title}
                          </h2>
                          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft">
                            Open this video from the Altroz HRMS YouTube channel.
                          </p>
                        </div>

                        <div className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/10 bg-primary-soft text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                          Watch on YouTube
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          Open channel
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              <div className="hidden min-h-[28rem] lg:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
