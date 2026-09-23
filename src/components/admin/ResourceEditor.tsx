
"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import ImageUploader from "./ImageUploader";
import IconUploader from "./IconUploader";

export type Field = {
  name: string;
  label: string;
  type?:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "date"
    | "checkbox"
    | "image"
    | "icon";
  required?: boolean;
  placeholder?: string;
  separator?: string;
};

type RecordValue =
  | string
  | boolean
  | number
  | null
  | undefined;

type ResourceRecord = Record<
  string,
  RecordValue | string[]
> & {
  id?: string;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950";

const listFields = new Set([
  "highlights",
  "values",
  "responsibilities",
  "technologies",
  "features",
  "tags",
  "keywords",
  "projectIds",
  "skills",
  "achievements",
]);

function formatList(value: string[]) {
  return value
    .map(
      (item) =>
        `"${item.replaceAll('"', '\\"')}"`
    )
    .join(", ");
}

function parseList(value: string) {
  return value
    .split(",")
    .map((item) =>
      item
        .trim()
        .replace(/^"|"$/g, "")
        .trim()
    )
    .filter(Boolean);
}

export default function ResourceEditor({
  title,
  description,
  resource,
  fields,
  singleton = false,
}: {
  title: string;
  description: string;
  resource: string;
  fields: readonly Field[];
  singleton?: boolean;
}) {
  const [records, setRecords] = useState<
    ResourceRecord[]
  >([]);

  const [form, setForm] = useState<
    Record<string, RecordValue>
  >({});

  const [editingId, setEditingId] =
    useState<string>();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [notice, setNotice] =
    useState("");

  const [error, setError] =
    useState("");

  /*
   * Create empty form
   */
  const blank = useCallback(() => {
    return Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.type === "checkbox"
          ? false
          : field.type === "number"
            ? ""
            : "",
      ])
    );
  }, [fields]);

  /*
   * Convert database record -> form values
   */
  const toForm = useCallback(
    (record: ResourceRecord) => {
      return Object.fromEntries(
        fields.map((field) => {
          const value = record[field.name];

          if (field.type === "checkbox") {
            return [
              field.name,
              Boolean(value),
            ];
          }

          if (field.type === "date") {
            return [
              field.name,
              value
                ? String(value).slice(0, 10)
                : "",
            ];
          }

          if (Array.isArray(value)) {
            return [
              field.name,
              formatList(value),
            ];
          }

          return [
            field.name,
            value ?? "",
          ];
        })
      );
    },
    [fields]
  );

  /*
   * Load records
   */
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/${resource}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Could not load content."
        );
      }

      const items = singleton
        ? data
          ? [data]
          : []
        : Array.isArray(data)
          ? data
          : [];

      setRecords(items);

      if (singleton) {
        if (items[0]) {
          setForm(
            toForm(items[0])
          );
        } else {
          setForm(blank());
        }
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load content."
      );
    } finally {
      setLoading(false);
    }
  }, [
    resource,
    singleton,
    toForm,
    blank,
  ]);

  /*
   * Initial load
   */
  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        void load();
      }, 0);

    return () =>
      window.clearTimeout(timer);
  }, [load]);

  /*
   * New record
   */
  function startNew() {
    setEditingId(undefined);
    setForm(blank());
    setNotice("");
    setError("");
  }

  /*
   * Edit record
   */
  function startEdit(
    record: ResourceRecord
  ) {
    setEditingId(record.id);
    setForm(toForm(record));
    setNotice("");
    setError("");
  }

  /*
   * Update form value
   */
  function updateField(
    name: string,
    value: RecordValue
  ) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  /*
   * Submit form
   */
  async function submit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setNotice("");
    setError("");

    try {
      const payload = Object.fromEntries(
        fields.map((field) => {
          const value =
            form[field.name];

          /*
           * Convert list fields
           */
          if (
            typeof value === "string" &&
            (field.separator ||
              listFields.has(field.name))
          ) {
            return [
              field.name,
              parseList(value),
            ];
          }

          /*
           * Number fields
           */
          if (
            field.type === "number"
          ) {
            if (
              value === "" ||
              value === null ||
              value === undefined
            ) {
              return [
                field.name,
                null,
              ];
            }

            const numberValue =
              Number(value);

            return [
              field.name,
              Number.isNaN(numberValue)
                ? null
                : numberValue,
            ];
          }

          /*
           * Everything else
           */
          return [
            field.name,
            value,
          ];
        })
      );

      const response =
        await fetch(
          `/api/admin/${resource}${
            editingId
              ? `?id=${editingId}`
              : ""
          }`,
          {
            method: editingId
              ? "PATCH"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Could not save this item."
        );
      }

      setNotice(
        editingId
          ? "Updated successfully."
          : "Created successfully."
      );

      await load();

      if (!singleton) {
        startNew();
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not save this item."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * Delete record
   */
  async function remove(id: string) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this item?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setNotice("");

      const response =
        await fetch(
          `/api/admin/${resource}?id=${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Could not delete this item."
        );
      }

      setNotice(
        "Deleted successfully."
      );

      await load();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete this item."
      );
    }
  }

  /*
   * Render normal field
   */
  function renderField(field: Field) {
    const value =
      form[field.name];

    /*
     * Image uploader
     */
    if (field.type === "image") {
      return (
        <ImageUploader
          key={field.name}
          label={field.label}
          value={String(
            value ?? ""
          )}
          onChange={(newValue) =>
            updateField(
              field.name,
              newValue
            )
          }
        />
      );
    }

    /*
     * Icon uploader
     */
    if (field.type === "icon") {
      return (
        <IconUploader
          key={field.name}
          label={field.label}
          value={String(
            value ?? ""
          )}
          onChange={(newValue) =>
            updateField(
              field.name,
              newValue
            )
          }
        />
      );
    }

    /*
     * Checkbox
     */
    if (field.type === "checkbox") {
      return (
        <label
          key={field.name}
          className="flex cursor-pointer items-center gap-3 text-sm font-semibold"
        >
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) =>
              updateField(
                field.name,
                event.target.checked
              )
            }
            className="size-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />

          <span>
            {field.label}
          </span>
        </label>
      );
    }

    /*
     * Textarea
     */
    if (
      field.type === "textarea"
    ) {
      return (
        <label
          key={field.name}
          className="block"
        >
          <span className="mb-1.5 block text-sm font-semibold">
            {field.label}
          </span>

          <textarea
            required={field.required}
            rows={5}
            value={String(
              value ?? ""
            )}
            placeholder={
              field.placeholder
            }
            onChange={(event) =>
              updateField(
                field.name,
                event.target.value
              )
            }
            className={inputClass}
          />
        </label>
      );
    }

    /*
     * Standard input
     */
    return (
      <label
        key={field.name}
        className="block"
      >
        <span className="mb-1.5 block text-sm font-semibold">
          {field.label}
        </span>

        <input
          required={field.required}
          type={
            field.type ?? "text"
          }
          value={String(
            value ?? ""
          )}
          placeholder={
            field.placeholder
          }
          onChange={(event) =>
            updateField(
              field.name,
              event.target.value
            )
          }
          className={inputClass}
        />
      </label>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 sm:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">

        {/* =========================
            CONTENT LIST
        ========================== */}
        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Content
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              {title}
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-500">
                Loading...
              </p>
            </div>
          ) : records.length === 0 ? (
            /* Empty state */
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="font-semibold">
                No content yet.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Use the editor to add
                the first entry.
              </p>
            </div>
          ) : (
            /* Records */
            <div className="space-y-3">
              {records.map(
                (record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold">
                        {String(
                          record[
                            fields[0]
                              ?.name
                          ] ??
                            "Untitled"
                        )}
                      </p>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {String(
                          record[
                            fields[1]
                              ?.name
                          ] ?? ""
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          startEdit(
                            record
                          )
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700"
                      >
                        Edit
                      </button>

                      {!singleton &&
                        record.id && (
                          <button
                            type="button"
                            onClick={() =>
                              remove(
                                record.id!
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30"
                          >
                            Delete
                          </button>
                        )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* =========================
            EDITOR
        ========================== */}
        <form
          onSubmit={submit}
          className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">
                {editingId
                  ? "Edit entry"
                  : singleton
                    ? "Update content"
                    : "Add entry"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage your portfolio
                content.
              </p>
            </div>

            {!singleton && (
              <button
                type="button"
                onClick={startNew}
                className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {fields.map(
              (field) =>
                renderField(field)
            )}
          </div>

          {/* Status */}
          {notice && (
            <div className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
              {notice}
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update changes"
                : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

