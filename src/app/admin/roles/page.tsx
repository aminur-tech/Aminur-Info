import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminRolesPage() {
  return <ResourceEditor title="Roles" description="Manage the role perspectives and evidence shown on the public portfolio." resource="roles" fields={[
    { name: "title", label: "Role title", required: true }, { name: "slug", label: "Slug", required: true },
    { name: "summary", label: "Summary", type: "textarea" }, { name: "responsibilities", label: "Responsibilities (items separated by colon)", type: "textarea" },
    { name: "technologies", label: "Technologies (items separated by colon)", type: "textarea" }, { name: "achievements", label: "Achievements (items separated by colon)", type: "textarea" },
    { name: "skills", label: "Relevant skills (items separated by colon)", type: "textarea" }, { name: "projectIds", label: "Project IDs (items separated by colon)", type: "textarea" },
    { name: "ctaLabel", label: "CTA label" }, { name: "ctaUrl", label: "CTA URL" },
    { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
  ]} />;
}