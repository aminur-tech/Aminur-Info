import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminSkillsPage() {
  return <ResourceEditor title="Skills" description="Manage the skills shown on your public portfolio." resource="skills" fields={[
    { name: "name", label: "Skill name", required: true }, { name: "category", label: "Category" }, { name: "icon", label: "Icon" },
    { name: "level", label: "Level (0-100)", type: "number" }, { name: "years", label: "Years", type: "number" }, { name: "featured", label: "Featured", type: "checkbox" }, { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
  ]} />;
}
