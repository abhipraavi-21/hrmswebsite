import { FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { mediaService } from "../../services/cmsService";
import type { MediaItem } from "../../types/cms";

export function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);

  const reload = async () => setItems(await mediaService.list());

  useEffect(() => {
    void reload();
  }, []);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    await mediaService.upload(file);
    toast.success("Media uploaded successfully");
    await reload();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Media</div>
            <h1 className="mt-2 text-3xl font-semibold">Media library</h1>
          </div>
          <label className="btn-primary cursor-pointer">
            <Upload className="h-4 w-4" />
            Upload
            <input
              type="file"
              accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime"
              className="hidden"
              onChange={(event) => void upload(event.target.files?.[0])}
            />
          </label>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            {item.fileType === "video" ? (
              <video src={item.fileUrl} className="h-48 w-full rounded-2xl object-cover" controls />
            ) : item.fileType === "image" ? (
              <img src={item.fileUrl} alt={item.altText ?? item.originalName} className="h-48 w-full rounded-2xl object-cover" />
            ) : (
              <div className="grid h-48 w-full place-items-center rounded-2xl bg-slate-100 text-slate-400">
                <FileText className="h-8 w-8" />
              </div>
            )}
            <div className="mt-4 text-sm font-semibold">{item.originalName}</div>
            <div className="mt-1 text-xs text-slate-500">{item.mimeType}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
