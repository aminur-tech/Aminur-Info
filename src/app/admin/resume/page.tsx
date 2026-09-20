"use client";

import { FormEvent, useEffect, useState } from "react";
import { FileText, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import ImageUploader from "../../../components/admin/ImageUploader";

type ResumeItem = {
  id: string;
  title: string;
  fileUrl: string;
  summary: string | null;
  isActive: boolean;
  version: string | null;
  published: boolean;
  sortOrder: number;
};

type FormState = Omit<ResumeItem, "id" | "fileUrl" | "summary" | "version"> & {
  id?: string;
  fileUrl: string;
  summary: string;
  version: string;
};

const blankForm: FormState = {
  title: "",
  fileUrl: "",
  summary: "",
  isActive: false,
  version: "",
  published: true,
  sortOrder: 0,
};

export default function AdminResumePage() {
  const [records, setRecords] = useState<ResumeItem[]>([]);
  const [form, setForm] = useState<FormState>(blankForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  async function loadRecords() {
    setLoading(true);
    const response = await fetch("/api/admin/resume");
    if (response.ok) setRecords(await response.json());
    setLoading(false);
  }

  useEffect(() => { void loadRecords(); }, []);

  function updateField(field: keyof FormState, value: string | boolean | number) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function editRecord(record: ResumeItem) {
    setEditing(true);
    setForm({
      ...record,
      fileUrl: record.fileUrl ?? "",
      summary: record.summary ?? "",
      version: record.version ?? "",
      published: record.published,
      isActive: record.isActive,
    });
  }

  async function saveRecord(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setNotice("");

    const payload = {
      ...form,
      id: undefined,
      fileUrl: form.fileUrl || null,
      summary: form.summary || null,
      version: form.version || null,
    };

    const response = await fetch(form.id ? `/api/admin/resume?id=${form.id}` : "/api/admin/resume", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!response.ok) {
      const result = await response.json();
      setNotice(result.error ?? "Unable to save resume.");
      return;
    }

    setNotice(form.id ? "Resume updated." : "Resume added.");
    setForm(blankForm);
    setEditing(false);
    await loadRecords();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this resume?")) return;
    const response = await fetch(`/api/admin/resume?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setNotice("Resume deleted.");
      await loadRecords();
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-5 dark:bg-slate-950 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Content management</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Resume</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Manage the active CV and downloadable resume files for your public portfolio.</p>
          </div>
          {!editing && <button onClick={() => { setForm(blankForm); setEditing(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"><Plus size={17} /> Add resume</button>}
        </div>

        {notice && <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">{notice}</div>}

        {editing && (
          <form onSubmit={saveRecord} className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{form.id ? "Edit resume" : "Add resume"}</h2>
                <p className="mt-1 text-sm text-slate-500">Only one resume should be marked active.</p>
              </div>
              <button type="button" onClick={() => setEditing(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={19} /></button>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold md:col-span-2"><span>Resume title</span><input required value={form.title} onChange={(event) => updateField("title", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="space-y-2 text-sm font-semibold md:col-span-2"><span>Summary</span><textarea rows={3} value={form.summary} onChange={(event) => updateField("summary", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="space-y-2 text-sm font-semibold"><span>Version</span><input value={form.version} onChange={(event) => updateField("version", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="space-y-2 text-sm font-semibold"><span>Sort order</span><input type="number" value={form.sortOrder} onChange={(event) => updateField("sortOrder", Number(event.target.value) || 0)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
              <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.isActive} onChange={(event) => updateField("isActive", event.target.checked)} className="size-4 accent-emerald-600" />Mark as active resume</label>
              <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.published} onChange={(event) => updateField("published", event.target.checked)} className="size-4 accent-emerald-600" />Published</label>
              <div className="md:col-span-2">
                <ImageUploader value={form.fileUrl} onChange={(value) => updateField("fileUrl", value)} label="Resume PDF" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(false)} className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
              <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">{saving && <Loader2 size={16} className="animate-spin" />}{saving ? "Saving..." : "Save resume"}</button>
            </div>
          </form>
        )}

        <div className="mt-8 space-y-3">
          {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900">Loading resumes...</div> : records.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900"><FileText className="mx-auto text-emerald-600" size={28} /><h2 className="mt-4 font-bold">No resume uploaded yet</h2><p className="mt-2 text-sm text-slate-500">Add your first resume to enable public download and viewing.</p></div> : records.map((record) => <article key={record.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><FileText size={19} /></div><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{record.title}</h2><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${record.isActive ? "bg-emerald-100 text-emerald-700" : record.published ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500"}`}>{record.isActive ? "Active" : record.published ? "Published" : "Draft"}</span></div><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{record.version || "Latest version"}</p>{record.fileUrl && <a href={record.fileUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-emerald-600 underline">Open file</a>}</div></div><div className="flex gap-2 sm:shrink-0"><button onClick={() => editRecord(record)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"><Pencil size={16} /></button><button onClick={() => remove(record.id)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"><Trash2 size={16} /></button></div></article>)}
        </div>
      </div>
    </div>
  );
}
