import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminSkillsPage() {
  return (
    <ResourceEditor
      title="Skills"
      description="Manage the skills shown on your public portfolio."
      resource="skills"
      fields={[
        {
          name: "name",
          label: "Skill name",
          required: true,
          placeholder: "React.js",
        },
        {
          name: "category",
          label: "Category",
          placeholder: "Frontend",
        },
        {
          name: "icon",
          label: "Technology Icon",
          type: "icon",
        },
        {
          name: "level",
          label: "Level (0-100)",
          type: "number",
          placeholder: "90",
        },
        {
          name: "years",
          label: "Years",
          type: "number",
          placeholder: "2",
        },
        {
          name: "featured",
          label: "Featured",
          type: "checkbox",
        },
        {
          name: "published",
          label: "Published",
          type: "checkbox",
        },
        {
          name: "sortOrder",
          label: "Sort order",
          type: "number",
          placeholder: "1",
        },
      ]}
    />
  );
}