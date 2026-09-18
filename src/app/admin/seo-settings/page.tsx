import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminSeoSettingsPage() {
  return <ResourceEditor title="SEO settings" description="Manage search metadata and sharing previews for the public site." resource="seo-settings" singleton fields={[
    { name: "title", label: "SEO title", required: true }, { name: "description", label: "Description", type: "textarea", required: true },
    { name: "keywords", label: "Keywords (comma separated)", type: "textarea" }, { name: "author", label: "Author" },
    { name: "ogTitle", label: "Open Graph title" }, { name: "ogDescription", label: "Open Graph description", type: "textarea" },
    { name: "ogImage", label: "Open Graph image", type: "image" }, { name: "canonicalUrl", label: "Canonical URL", type: "url" },
    { name: "allowIndexing", label: "Allow indexing", type: "checkbox" },
  ]} />;
}