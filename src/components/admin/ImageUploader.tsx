"use client";

import { FileText, ImagePlus, Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

type ImageUploaderProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const acceptedTypes = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
  "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const maxSize = 10 * 1024 * 1024;

export default function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    if (!acceptedTypes.includes(file.type)) {
      setError("Use JPG, PNG, WEBP, SVG, PDF, DOC, or DOCX files.");
      return;
    }
    if (file.size > maxSize) {
      setError("Files must be smaller than 10 MB.");
      return;
    }

    setUploading(true);
    try {
      const signatureResponse = await fetch("/api/admin/media/signature", { method: "POST" });
      const signature = await signatureResponse.json();
      if (!signatureResponse.ok) throw new Error(signature.error ?? "Unable to prepare upload.");

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", signature.apiKey);
      body.append("timestamp", String(signature.timestamp));
      body.append("folder", signature.folder);
      body.append("signature", signature.signature);
      body.append("resource_type", signature.resourceType);
      const response = await fetch(signature.uploadUrl, { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message ?? "File upload failed. Check Cloudinary upload permissions.");
      onChange(result.secure_url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "File upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return <div className="space-y-2">
    <span className="block text-sm font-semibold">{label}</span>
    <div className="flex flex-wrap items-center gap-3">
        {value ? <div className="relative size-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">{value.toLowerCase().includes(".pdf") ? <a href={value} target="_blank" rel="noreferrer" className="grid size-full place-items-center text-red-600" aria-label="Open uploaded PDF"><FileText size={28} /></a> : <img src={value} alt="Selected upload preview" className="size-full object-cover" />}<button type="button" aria-label="Remove file" onClick={() => onChange("")} className="absolute right-1 top-1 rounded-md bg-slate-950/70 p-1 text-white"><Trash2 size={13} /></button></div> : <div className="grid size-20 place-items-center rounded-xl border border-dashed border-slate-300 text-slate-400 dark:border-slate-700"><ImagePlus size={22} /></div>}
      <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-60 dark:border-slate-700">{uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}{uploading ? "Uploading..." : value ? "Replace file" : "Upload from computer"}</button>
      <input ref={inputRef} type="file" accept={acceptedTypes.join(",")} onChange={upload} className="hidden" />
    </div>
    {error && <p role="alert" className="text-xs font-semibold text-red-600">{error}</p>}
  </div>;
}
