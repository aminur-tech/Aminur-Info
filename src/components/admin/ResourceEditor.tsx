"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "number" | "date" | "checkbox" | "image";
  required?: boolean;
  placeholder?: string;
};

type RecordValue = string | boolean | number | null | undefined;
type ResourceRecord = Record<string, RecordValue | string[]> & { id?: string };

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950";

export default function ResourceEditor({ title, description, resource, fields, singleton = false }: { title: string; description: string; resource: string; fields: readonly Field[]; singleton?: boolean }) {
  const [records, setRecords] = useState<ResourceRecord[]>([]);
  const [form, setForm] = useState<Record<string, RecordValue>>({});
  const [editingId, setEditingId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const blank = () => Object.fromEntries(fields.map((field) => [field.name, field.type === "checkbox" ? false : ""]));

  const toForm = useCallback((record: ResourceRecord) => Object.fromEntries(fields.map((field) => {
    const value = record[field.name];
    if (field.type === "checkbox") return [field.name, Boolean(value)];
    if (field.type === "date") return [field.name, value ? String(value).slice(0, 10) : ""];
    if (Array.isArray(value)) return [field.name, value.join(", ")];
    return [field.name, value ?? ""];
  })), [fields]);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`/api/admin/${resource}`);
    const data = await response.json();
    const items = singleton ? (data ? [data] : []) : Array.isArray(data) ? data : [];
    setRecords(items);
    if (singleton && items[0]) setForm(toForm(items[0]));
    setLoading(false);
  }, [resource, singleton, toForm]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function startNew() {
    setEditingId(undefined);
    setForm(blank());
    setNotice("");
  }

  function startEdit(record: ResourceRecord) {
    setEditingId(record.id);
    setForm(toForm(record));
    setNotice("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    const response = await fetch(`/api/admin/${resource}${editingId ? `?id=${editingId}` : ""}`, {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) {
      setNotice(data.error ?? "Could not save this item.");
      return;
    }
    setNotice("Saved successfully.");
    await load();
    if (!singleton) startNew();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item?")) return;
    const response = await fetch(`/api/admin/${resource}?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setNotice("Deleted successfully.");
      await load();
    } else setNotice("Could not delete this item.");
  }

  return <div className="min-h-[calc(100vh-4rem)] p-6 sm:p-8"><div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
    <section><div className="mb-6"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Content</p><h1 className="mt-2 text-3xl font-black tracking-tight">{title}</h1><p className="mt-2 text-slate-500 dark:text-slate-400">{description}</p></div>
      {loading ? <p className="text-sm text-slate-500">Loading...</p> : records.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"><p className="font-semibold">No content yet.</p><p className="mt-1 text-sm text-slate-500">Use the editor to add the first entry.</p></div> : <div className="space-y-3">{records.map((record) => <div key={record.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="min-w-0"><p className="truncate font-bold">{String(record[fields[0]?.name] ?? "Untitled")}</p><p className="mt-1 truncate text-sm text-slate-500">{String(record[fields[1]?.name] ?? "")}</p></div><div className="flex shrink-0 gap-2"><button onClick={() => startEdit(record)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:border-emerald-500 dark:border-slate-700">Edit</button>{!singleton && record.id && <button onClick={() => remove(record.id!)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-900">Delete</button>}</div></div>)}</div>}
    </section>
    <form onSubmit={submit} className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-5 flex items-center justify-between"><h2 className="font-bold">{editingId ? "Edit entry" : singleton ? "Update content" : "Add entry"}</h2>{!singleton && <button type="button" onClick={startNew} className="text-xs font-semibold text-emerald-600">Clear</button>}</div><div className="space-y-4">{fields.map((field) => field.type === "image" ? <ImageUploader key={field.name} label={field.label} value={String(form[field.name] ?? "")} onChange={(value) => setForm({ ...form, [field.name]: value })} /> : <label key={field.name} className={field.type === "checkbox" ? "flex items-center gap-3 text-sm font-semibold" : "block"}>{field.type === "checkbox" ? <><input type="checkbox" checked={Boolean(form[field.name])} onChange={(event) => setForm({ ...form, [field.name]: event.target.checked })} />{field.label}</> : <><span className="mb-1.5 block text-sm font-semibold">{field.label}</span>{field.type === "textarea" ? <textarea required={field.required} rows={4} value={String(form[field.name] ?? "")} placeholder={field.placeholder} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} className={inputClass} /> : <input required={field.required} type={field.type ?? "text"} value={String(form[field.name] ?? "")} placeholder={field.placeholder} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} className={inputClass} />}</>}</label>)}</div>{notice && <p className="mt-4 text-sm font-semibold text-emerald-600">{notice}</p>}<button disabled={saving} className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">{saving ? "Saving..." : "Save changes"}</button></form>
  </div></div>;
}
