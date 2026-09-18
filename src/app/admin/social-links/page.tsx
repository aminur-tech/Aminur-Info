import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminSocialLinksPage() {
  return <ResourceEditor title="Social links" description="Control the professional links shown across the public portfolio." resource="social-links" fields={[
    { name: "platform", label: "Platform", required: true }, { name: "label", label: "Label", required: true },
    { name: "url", label: "URL", type: "url", required: true }, { name: "published", label: "Published", type: "checkbox" },
    { name: "sortOrder", label: "Sort order", type: "number" },
  ]} />;
}