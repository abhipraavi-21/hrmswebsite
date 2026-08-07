import { Upload, X } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { mediaService } from "../../services/cmsService";

type ImageUploadFieldProps = {
  label: string;
  value?: string | null;
  onChange: (value: string) => void;
  altText?: string | null;
  onAltTextChange?: (value: string) => void;
  altTextLabel?: string;
  altTextPlaceholder?: string;
};

export function ImageUploadField({
  label,
  value,
  onChange,
  altText,
  onAltTextChange,
  altTextLabel,
  altTextPlaceholder,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsUploading(true);

    try {
      const uploaded = await mediaService.upload(file);
      onChange(uploaded.fileUrl);
      toast.success(`${label} uploaded. Save the form to keep this change.`);
    } catch {
      toast.error(`Unable to upload ${label.toLowerCase()}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="field">
      <div className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              onAltTextChange?.("");
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 transition hover:text-rose-700"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        ) : null}
      </div>

      {value ? (
        <img
          src={value}
          alt={altText || label}
          className="h-32 w-full rounded-2xl border border-slate-200 object-cover"
        />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
          No image selected
        </div>
      )}

      <label className="btn-secondary mt-3 cursor-pointer justify-center">
        <Upload className="h-4 w-4" />
        {isUploading ? "Uploading..." : value ? "Replace Image" : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => void handleUpload(event)}
          disabled={isUploading}
        />
      </label>

      {onAltTextChange ? (
        <label className="field mt-3">
          <span>{altTextLabel ?? `${label} alt text`}</span>
          <input
            value={altText ?? ""}
            placeholder={altTextPlaceholder ?? `Describe the ${label.toLowerCase()}`}
            onChange={(event) => onAltTextChange(event.target.value)}
          />
        </label>
      ) : null}

      {value ? (
        <div className="mt-3 break-all rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
          {value}
        </div>
      ) : null}
    </div>
  );
}
