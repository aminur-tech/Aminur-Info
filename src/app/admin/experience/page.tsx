"use client";

import { FormEvent, useEffect, useState } from "react";
import { BriefcaseBusiness, Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import ImageUploader from "../../../components/admin/ImageUploader";

type Experience = {
    id: string;
    company: string;
    position: string;
    employmentType: string | null;
    location: string | null;
    workMode: string | null;
    startDate: string | null;
    endDate: string | null;
    currentPosition: boolean;
    description: string | null;
    responsibilities: string[];
    technologies: string[];
    companyLogoUrl: string | null;
    companyUrl: string | null;
    published: boolean;
    sortOrder: number;
};

type FormState = Omit<Experience, "id" | "startDate" | "endDate" | "responsibilities" | "technologies"> & {
    id?: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    technologies: string;
};

const blankForm: FormState = {
    company: "", position: "", employmentType: "", location: "", workMode: "",
    startDate: "", endDate: "", currentPosition: false, description: "",
    responsibilities: "", technologies: "", companyLogoUrl: "", companyUrl: "",
    published: false, sortOrder: 0,
};

function formatDate(value: string | null) {
    return value ? new Date(value).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present";
}

export default function AdminExperiencePage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [form, setForm] = useState<FormState>(blankForm);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState("");

    async function loadExperiences() {
        setLoading(true);
        const response = await fetch("/api/admin/experience");
        if (response.ok) setExperiences(await response.json());
        setLoading(false);
    }

    useEffect(() => {
        let active = true;
        fetch("/api/admin/experience")
            .then((response) => response.ok ? response.json() : [])
            .then((data: Experience[]) => {
                if (active) {
                    setExperiences(data);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (active) setLoading(false);
            });
        return () => { active = false; };
    }, []);

    function editExperience(experience: Experience) {
        setEditing(true);
        setForm({
            ...experience,
            startDate: experience.startDate?.slice(0, 10) ?? "",
            endDate: experience.endDate?.slice(0, 10) ?? "",
            responsibilities: experience.responsibilities.join(", "),
            technologies: experience.technologies.join(", "),
            companyLogoUrl: experience.companyLogoUrl ?? "",
            companyUrl: experience.companyUrl ?? "",
            employmentType: experience.employmentType ?? "",
            location: experience.location ?? "",
            workMode: experience.workMode ?? "",
            description: experience.description ?? "",
        });
    }

    function updateField(field: keyof FormState, value: string | boolean | number) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function saveExperience(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setNotice("");
        const payload = {
            ...form,
            id: undefined,
            startDate: form.startDate ? new Date(`${form.startDate}T00:00:00.000Z`).toISOString() : null,
            endDate: form.currentPosition || !form.endDate ? null : new Date(`${form.endDate}T00:00:00.000Z`).toISOString(),
            responsibilities: form.responsibilities.split(",").map((item) => item.trim()).filter(Boolean),
            technologies: form.technologies.split(",").map((item) => item.trim()).filter(Boolean),
            companyLogoUrl: form.companyLogoUrl || null,
            companyUrl: form.companyUrl || null,
        };
        const response = await fetch(form.id ? `/api/admin/experience?id=${form.id}` : "/api/admin/experience", {
            method: form.id ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        setSaving(false);
        if (!response.ok) {
            const result = await response.json();
            setNotice(result.error ?? "Unable to save this experience.");
            return;
        }
        setNotice(form.id ? "Experience updated." : "Experience added.");
        setForm(blankForm);
        setEditing(false);
        await loadExperiences();
    }

    async function deleteExperience(id: string) {
        if (!window.confirm("Delete this experience? This action cannot be undone.")) return;
        const response = await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
        if (response.ok) {
            setNotice("Experience deleted.");
            await loadExperiences();
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-5 dark:bg-slate-950 sm:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Content management</p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight">Experience</h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Control the work history shown on your portfolio.</p>
                    </div>
                    {!editing && <button onClick={() => { setForm(blankForm); setEditing(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"><Plus size={17} /> Add experience</button>}
                </div>

                {notice && <div role="status" className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"><Check size={17} />{notice}</div>}

                {editing && <form onSubmit={saveExperience} className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                    <div className="mb-6 flex items-center justify-between"><div><h2 className="text-lg font-bold">{form.id ? "Edit experience" : "Add experience"}</h2><p className="mt-1 text-sm text-slate-500">Fields marked with * are required.</p></div><button type="button" aria-label="Close editor" onClick={() => setEditing(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={19} /></button></div>
                    <div className="grid gap-5 md:grid-cols-2">
                        {([["company", "Company *"], ["position", "Position *"], ["employmentType", "Employment type"], ["location", "Location"], ["workMode", "Work mode"], ["companyUrl", "Company URL"]] as const).map(([field, label]) => <label key={field} className="space-y-2 text-sm font-semibold"><span>{label}</span><input required={field === "company" || field === "position"} value={String(form[field])} onChange={(event) => updateField(field, event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>)}
                        <label className="space-y-2 text-sm font-semibold"><span>Start date</span><input type="date" value={form.startDate} onChange={(event) => updateField("startDate", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
                        <label className="space-y-2 text-sm font-semibold"><span>End date</span><input type="date" disabled={form.currentPosition} value={form.endDate} onChange={(event) => updateField("endDate", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800" /></label>
                        <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.currentPosition} onChange={(event) => updateField("currentPosition", event.target.checked)} className="size-4 accent-emerald-600" />Current position</label>
                        <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.published} onChange={(event) => updateField("published", event.target.checked)} className="size-4 accent-emerald-600" />Published on website</label>
                        <label className="space-y-2 text-sm font-semibold md:col-span-2"><span>Description</span><textarea rows={4} value={String(form.description)} onChange={(event) => updateField("description", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
                        <label className="space-y-2 text-sm font-semibold"><span>Responsibilities <small className="font-normal text-slate-500">comma separated</small></span><textarea rows={3} value={form.responsibilities} onChange={(event) => updateField("responsibilities", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
                        <label className="space-y-2 text-sm font-semibold"><span>Technologies <small className="font-normal text-slate-500">comma separated</small></span><textarea rows={3} value={form.technologies} onChange={(event) => updateField("technologies", event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-normal outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800" /></label>
                        <div className="md:col-span-2"><ImageUploader value={String(form.companyLogoUrl)} onChange={(value) => updateField("companyLogoUrl", value)} label="Company logo" /></div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setEditing(false)} className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60">{saving && <Loader2 size={16} className="animate-spin" />}{saving ? "Saving..." : "Save experience"}</button></div>
                </form>}

                <div className="mt-8 space-y-3">
                    {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900">Loading experience...</div> : experiences.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900"><BriefcaseBusiness className="mx-auto text-emerald-600" size={28} /><h2 className="mt-4 font-bold">No experience added yet</h2><p className="mt-2 text-sm text-slate-500">Add your first role to populate the public timeline.</p></div> : experiences.map((experience) => <article key={experience.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><BriefcaseBusiness size={19} /></div><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{experience.position}</h2><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${experience.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{experience.published ? "Published" : "Draft"}</span></div><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{experience.company}{experience.location ? ` · ${experience.location}` : ""}</p><p className="mt-1 text-xs text-slate-500">{formatDate(experience.startDate)} — {experience.currentPosition ? "Present" : formatDate(experience.endDate)}</p></div></div><div className="flex gap-2 sm:shrink-0"><button aria-label={`Edit ${experience.position}`} onClick={() => editExperience(experience)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300"><Pencil size={16} /></button><button aria-label={`Delete ${experience.position}`} onClick={() => deleteExperience(experience.id)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-red-500 hover:text-red-600 dark:border-slate-700 dark:text-slate-300"><Trash2 size={16} /></button></div></article>)}
                </div>
            </div>
        </div>
    );
}