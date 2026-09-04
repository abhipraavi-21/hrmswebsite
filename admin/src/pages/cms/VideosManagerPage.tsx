import {
  ExternalLink,
  Film,
  ImageOff,
  PencilLine,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ImageUploadField } from "../../components/editor/ImageUploadField";
import { mediaService, videoService } from "../../services/cmsService";
import type { ResourceVideo } from "../../types/cms";
import { getPublicSiteUrl } from "../../utils/publicSite";

type VideoDraft = Partial<ResourceVideo> & {
  title: string;
  videoSource: ResourceVideo["videoSource"];
  videoUrl: string;
  status: ResourceVideo["status"];
  displayOrder: number;
};

const publicVideoPath = "/resources/video";

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    const responseData = error.response.data as {
      message: string;
      errors?: Array<{ message?: string }>;
    };
    const firstErrorMessage = responseData.errors?.find((item) => typeof item.message === "string")?.message;

    return firstErrorMessage ? `${responseData.message}: ${firstErrorMessage}` : responseData.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while managing videos.";
}

function createBlankDraft(displayOrder = 0): VideoDraft {
  return {
    title: "",
    label: "Featured video",
    description: "Play this video directly on the page.",
    videoSource: "youtube",
    videoUrl: "",
    videoId: "",
    thumbnailUrl: "",
    thumbnailAlt: "",
    status: "draft",
    displayOrder,
    publishedAt: "",
  };
}

function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

function fromDateTimeLocal(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not published yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getStatusBadgeClass(status: ResourceVideo["status"]) {
  return status === "published"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-amber-200 bg-amber-50 text-amber-700";
}

function extractYouTubeId(value?: string | null) {
  const normalized = (value ?? "").trim();

  if (!normalized) {
    return "";
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(normalized)) {
    return normalized;
  }

  try {
    const url = new URL(normalized);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "").split("/")[0] ?? "";
    }

    if (url.searchParams.has("v")) {
      return url.searchParams.get("v") ?? "";
    }

    return url.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/)?.[1] ?? "";
  } catch {
    return normalized.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/)?.[1] ?? "";
  }
}

function getPreviewThumbnail(video: Partial<ResourceVideo>) {
  if (video.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  const videoId = video.videoId || extractYouTubeId(video.videoUrl);
  return video.videoSource === "youtube" && videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
}

export function VideosManagerPage() {
  const [videos, setVideos] = useState<ResourceVideo[]>([]);
  const [draft, setDraft] = useState<VideoDraft>(() => createBlankDraft());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const publicVideoUrl = useMemo(() => new URL(publicVideoPath, getPublicSiteUrl()).href, []);
  const previewThumbnail = getPreviewThumbnail(draft);

  const reload = async () => {
    try {
      setVideos(await videoService.list());
      setLoadError(null);
    } catch (error) {
      setVideos([]);
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  useEffect(() => {
    if (!editingId) {
      setDraft((current) => ({ ...current, displayOrder: videos.length }));
    }
  }, [editingId, videos.length]);

  const resetForm = () => {
    setEditingId(null);
    setDraft(createBlankDraft(videos.length));
  };

  const editVideo = (video: ResourceVideo) => {
    setEditingId(video.id);
    setDraft({
      ...video,
      label: video.label ?? "Featured video",
      description: video.description ?? "Play this video directly on the page.",
      videoId: video.videoId ?? "",
      thumbnailUrl: video.thumbnailUrl ?? "",
      thumbnailAlt: video.thumbnailAlt ?? "",
      publishedAt: toDateTimeLocal(video.publishedAt),
    });
  };

  const saveVideo = async () => {
    setIsSaving(true);

    try {
      const payload: Partial<ResourceVideo> = {
        ...draft,
        publishedAt: fromDateTimeLocal(draft.publishedAt ?? ""),
      };

      if (editingId) {
        await videoService.update(editingId, payload);
        toast.success("Video updated");
      } else {
        await videoService.create(payload);
        toast.success("Video added");
      }

      resetForm();
      await reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const removeVideo = async (video: ResourceVideo) => {
    if (!window.confirm(`Delete video "${video.title}"?`)) {
      return;
    }

    try {
      await videoService.remove(video.id);
      if (editingId === video.id) {
        resetForm();
      }
      toast.success("Video deleted");
      await reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const uploadVideo = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsUploadingVideo(true);

    try {
      const uploaded = await mediaService.upload(file);
      setDraft((current) => ({
        ...current,
        title: current.title || uploaded.originalName.replace(/\.[^.]+$/, ""),
        videoSource: "upload",
        videoUrl: uploaded.fileUrl,
        videoId: "",
      }));
      toast.success("Video uploaded. Save the form to publish it.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploadingVideo(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              HRMS Resources
            </div>
            <h1 className="mt-2 text-3xl font-semibold">Manage video page</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Add YouTube videos or upload video files for the public HRMS resources video page.
              Draft videos stay hidden until they are published.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-sky-600">
              Public page path: {publicVideoPath}
            </p>
          </div>

          <a href={publicVideoUrl} target="_blank" rel="noreferrer" className="btn-secondary">
            <ExternalLink className="h-4 w-4" />
            Open Public Page
          </a>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              {editingId ? "Edit Selected Video" : "Add New Video"}
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {editingId ? draft.title || "Untitled video" : "Create a video card"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {editingId ? (
              <button type="button" onClick={resetForm} className="btn-secondary">
                <X className="h-4 w-4" />
                Cancel Edit
              </button>
            ) : null}
            <button type="button" onClick={() => void saveVideo()} className="btn-primary" disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : editingId ? "Save Video" : "Add Video"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_22rem]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field md:col-span-2">
              <span>Video title</span>
              <input
                value={draft.title}
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                placeholder="Enter video title"
              />
            </label>

            <label className="field">
              <span>Label</span>
              <input
                value={draft.label ?? ""}
                onChange={(event) => setDraft((current) => ({ ...current, label: event.target.value }))}
                placeholder="Featured video"
              />
            </label>

            <label className="field">
              <span>Status</span>
              <select
                value={draft.status}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    status: event.target.value as ResourceVideo["status"],
                  }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label className="field">
              <span>Video source</span>
              <select
                value={draft.videoSource}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    videoSource: event.target.value as ResourceVideo["videoSource"],
                    videoId: event.target.value === "youtube" ? current.videoId : "",
                  }))
                }
              >
                <option value="youtube">YouTube</option>
                <option value="upload">Uploaded video</option>
                <option value="external">External MP4/WebM URL</option>
              </select>
            </label>

            <label className="field">
              <span>Display order</span>
              <input
                type="number"
                value={draft.displayOrder}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, displayOrder: Number(event.target.value) }))
                }
              />
            </label>

            <label className="field md:col-span-2">
              <span>
                {draft.videoSource === "youtube"
                  ? "YouTube URL or video ID"
                  : draft.videoSource === "upload"
                    ? "Uploaded video URL"
                    : "External video URL"}
              </span>
              <input
                value={draft.videoUrl}
                onChange={(event) => setDraft((current) => ({ ...current, videoUrl: event.target.value }))}
                placeholder={
                  draft.videoSource === "youtube"
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://example.com/video.mp4"
                }
              />
            </label>

            {draft.videoSource === "youtube" ? (
              <label className="field">
                <span>YouTube video ID (optional)</span>
                <input
                  value={draft.videoId ?? ""}
                  onChange={(event) => setDraft((current) => ({ ...current, videoId: event.target.value }))}
                  placeholder="Auto-detected from URL"
                />
              </label>
            ) : (
              <label className="field">
                <span>Upload video file</span>
                <label className="btn-secondary cursor-pointer justify-center">
                  <Upload className="h-4 w-4" />
                  {isUploadingVideo ? "Uploading..." : "Upload Video"}
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="hidden"
                    onChange={(event) => void uploadVideo(event)}
                    disabled={isUploadingVideo}
                  />
                </label>
              </label>
            )}

            <label className="field">
              <span>Publish date</span>
              <input
                type="datetime-local"
                value={draft.publishedAt ?? ""}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, publishedAt: event.target.value }))
                }
              />
            </label>

            <label className="field md:col-span-2">
              <span>Description</span>
              <textarea
                rows={4}
                value={draft.description ?? ""}
                onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                placeholder="Short text below the video title"
              />
            </label>

            <div className="md:col-span-2">
              <ImageUploadField
                label="Thumbnail image"
                value={draft.thumbnailUrl ?? ""}
                onChange={(value) => setDraft((current) => ({ ...current, thumbnailUrl: value }))}
                altText={draft.thumbnailAlt ?? ""}
                onAltTextChange={(value) => setDraft((current) => ({ ...current, thumbnailAlt: value }))}
                altTextLabel="Thumbnail alt text"
                altTextPlaceholder="Describe the video thumbnail"
              />
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Preview
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="aspect-video bg-slate-100">
                {previewThumbnail ? (
                  <img
                    src={previewThumbnail}
                    alt={draft.thumbnailAlt || draft.title || "Video thumbnail"}
                    className="h-full w-full object-cover"
                  />
                ) : draft.videoSource === "upload" && draft.videoUrl ? (
                  <video src={draft.videoUrl} className="h-full w-full object-cover" controls />
                ) : (
                  <div className="grid h-full place-items-center text-slate-400">
                    <ImageOff className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
                  {draft.label || "Featured video"}
                </div>
                <h3 className="mt-2 text-base font-semibold leading-6 text-slate-900">
                  {draft.title || "Video title"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {draft.description || "Play this video directly on the page."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {loadError ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 text-sm text-amber-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
            Video API Issue
          </div>
          <p className="mt-2">{loadError}</p>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Existing Videos
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {isLoading ? "Loading videos..." : `${videos.length} ${videos.length === 1 ? "video" : "videos"}`}
            </h2>
          </div>
          <button type="button" onClick={resetForm} className="btn-secondary">
            <Plus className="h-4 w-4" />
            New Video
          </button>
        </div>

        {!isLoading && videos.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  <th className="px-6 py-4">Preview</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Published</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {videos.map((video) => {
                  const thumbnail = getPreviewThumbnail(video);

                  return (
                    <tr key={video.id} className={editingId === video.id ? "bg-sky-50/50" : undefined}>
                      <td className="px-6 py-4">
                        <div className="h-16 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={video.thumbnailAlt || video.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="grid h-full place-items-center text-slate-400">
                              <Film className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="max-w-md px-6 py-4">
                        <div className="text-sm font-semibold leading-6 text-slate-900">{video.title}</div>
                        <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                          {video.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm capitalize text-slate-600">
                        {video.videoSource}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(video.publishedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${getStatusBadgeClass(video.status)}`}
                        >
                          {video.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => editVideo(video)} className="btn-secondary">
                            <PencilLine className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void removeVideo(video)}
                            className="btn-danger"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        {!isLoading && !videos.length ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No videos yet. Use the form above to add the first resource video.
          </div>
        ) : null}
      </section>
    </div>
  );
}
