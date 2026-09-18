import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminRolesPage() {
  return <ResourceEditor title="Roles" description="Manage the role perspectives and evidence shown on the public portfolio." resource="roles" fields={[
    { name: "title", label: "Role title", required: true }, { name: "slug", label: "Slug", required: true },
    { name: "summary", label: "Summary", type: "textarea" }, { name: "responsibilities", label: "Responsibilities (comma separated)", type: "textarea" },
    { name: "technologies", label: "Technologies (comma separated)", type: "textarea" }, { name: "achievements", label: "Achievements (comma separated)", type: "textarea" },
    { name: "skills", label: "Relevant skills (comma separated)", type: "textarea" }, { name: "projectIds", label: "Project IDs (comma separated)", type: "textarea" },
    { name: "ctaLabel", label: "CTA label" }, { name: "ctaUrl", label: "CTA URL", type: "url" },
    { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
  ]} />;
}