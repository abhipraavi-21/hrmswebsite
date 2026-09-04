import { models } from "../config/database.js";
import { AppError } from "../utils/AppError.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePublishedAt(value, status, currentValue = null) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return status === "published" ? currentValue ?? new Date() : null;
  }

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? currentValue : parsed;
}

function extractYouTubeId(value) {
  const normalized = normalizeText(value);

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

    const embedMatch = url.pathname.match(/\/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
    return embedMatch?.[1] ?? "";
  } catch {
    const match = normalized.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] ?? "";
  }
}

function buildYouTubeWatchUrl(videoId) {
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
}

function buildYouTubeThumbnail(videoId) {
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "";
}

function normalizeVideoPayload(payload = {}, currentVideo = null) {
  const videoSource = payload.videoSource ?? currentVideo?.video_source ?? "youtube";
  const status = payload.status ?? currentVideo?.status ?? "draft";
  const title = normalizeText(payload.title) || currentVideo?.title || "";
  const rawVideoUrl = normalizeText(payload.videoUrl) || currentVideo?.video_url || "";
  const explicitVideoId = normalizeText(payload.videoId);
  const videoId =
    videoSource === "youtube"
      ? explicitVideoId || extractYouTubeId(rawVideoUrl) || currentVideo?.video_id || ""
      : explicitVideoId || null;
  const videoUrl = videoSource === "youtube" ? buildYouTubeWatchUrl(videoId) : rawVideoUrl;
  const thumbnailUrl =
    normalizeText(payload.thumbnailUrl) ||
    (videoSource === "youtube" ? buildYouTubeThumbnail(videoId) : "") ||
    currentVideo?.thumbnail_url ||
    null;

  if (!title) {
    throw new AppError("Video title is required", 400);
  }

  if (!videoUrl) {
    throw new AppError("Video URL is required", 400);
  }

  if (videoSource === "youtube" && !videoId) {
    throw new AppError("A valid YouTube URL or video ID is required", 400, [
      {
        path: "videoUrl",
        message: "Use a full YouTube link, youtu.be link, Shorts link, embed link, or 11-character video ID",
      },
    ]);
  }

  return {
    title,
    label: normalizeText(payload.label) || currentVideo?.label || "Featured video",
    description:
      normalizeText(payload.description) || currentVideo?.description || "Play this video directly on the page.",
    video_source: videoSource,
    video_url: videoUrl,
    video_id: videoId || null,
    thumbnail_url: thumbnailUrl,
    thumbnail_alt: normalizeText(payload.thumbnailAlt) || currentVideo?.thumbnail_alt || title,
    status,
    display_order: payload.displayOrder ?? currentVideo?.display_order ?? 0,
    published_at: parsePublishedAt(payload.publishedAt, status, currentVideo?.published_at ?? null),
  };
}

export function serializeVideo(video) {
  return {
    id: video.id,
    title: video.title,
    label: video.label,
    description: video.description,
    videoSource: video.video_source,
    videoUrl: video.video_url,
    videoId: video.video_id,
    thumbnailUrl: video.thumbnail_url,
    thumbnailAlt: video.thumbnail_alt,
    status: video.status,
    displayOrder: video.display_order,
    publishedAt: video.published_at ? video.published_at.toISOString() : null,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt,
  };
}

export async function listVideos({ publishedOnly = false } = {}) {
  const videos = await models.ResourceVideo.findAll({
    where: publishedOnly ? { status: "published" } : {},
    order: [
      ["display_order", "ASC"],
      ["published_at", "DESC"],
      ["updated_at", "DESC"],
    ],
  });

  return videos.map(serializeVideo);
}

export async function getVideoById(id) {
  const video = await models.ResourceVideo.findByPk(id);

  if (!video) {
    throw new AppError("Video not found", 404);
  }

  return video;
}

export async function createVideo(payload) {
  const video = await models.ResourceVideo.create(normalizeVideoPayload(payload));
  return serializeVideo(await getVideoById(video.id));
}

export async function updateVideo(id, payload) {
  const video = await getVideoById(id);
  await video.update(normalizeVideoPayload(payload, video));
  return serializeVideo(await getVideoById(id));
}

export async function deleteVideo(id) {
  const video = await getVideoById(id);
  await video.destroy();
}
