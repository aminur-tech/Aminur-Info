"use client";

import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

type IconUploaderProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const acceptedTypes = [
  "image/svg+xml",
  "image/png",
  "image/webp",
  "image/jpeg",
];

const maxSize = 2 * 1024 * 1024; // 2 MB

export default function IconUploader({
  value,
  onChange,
  label = "Icon",
}: IconUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!acceptedTypes.includes(file.type)) {
      setError("Only SVG, PNG, WEBP, and JPG icons are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setError("Icon must be smaller than 2 MB.");
      return;
    }

    setUploading(true);

    try {
      const signatureResponse = await fetch(
        "/api/admin/media/signature",
        {
          method: "POST",
        }
      );

      const signature = await signatureResponse.json();

      if (!signatureResponse.ok) {
        throw new Error(
          signature.error ?? "Unable to prepare upload."
        );
      }

      const body = new FormData();

      body.append("file", file);
      body.append("api_key", signature.apiKey);
      body.append("timestamp", String(signature.timestamp));
      body.append("folder", signature.folder);
      body.append("signature", signature.signature);
      body.append("resource_type", signature.resourceType);

      const response = await fetch(signature.uploadUrl, {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.message ?? "Icon upload failed."
        );
      }

      onChange(result.secure_url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Icon upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold">
        {label}
      </span>

      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative grid size-16 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
            <img
              src={value}
              alt="Uploaded icon"
              className="size-full object-contain"
            />

            <button
              type="button"
              aria-label="Remove icon"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 rounded-md bg-slate-950/75 p-1 text-white"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ) : (
          <div className="grid size-16 place-items-center rounded-xl border border-dashed border-slate-300 text-slate-400 dark:border-slate-700">
            <ImagePlus size={20} />
          </div>
        )}

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold transition hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-60 dark:border-slate-700"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ImagePlus size={16} />
          )}

          {uploading
            ? "Uploading..."
            : value
              ? "Replace icon"
              : "Upload icon"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={upload}
          className="hidden"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="text-xs font-semibold text-red-600"
        >
          {error}
        </p>
      )}

      <p className="text-xs text-slate-500">
        SVG recommended. PNG, WEBP, JPG also supported. Max 2 MB.
      </p>
    </div>
  );
}