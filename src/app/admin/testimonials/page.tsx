import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminTestimonialsPage() {
  return <ResourceEditor title="Testimonials" description="Review and moderate client feedback." resource="testimonials" fields={[
    { name: "name", label: "Name", required: true }, { name: "email", label: "Email", type: "text" }, { name: "comment", label: "Comment", type: "textarea", required: true },
    { name: "role", label: "Role" }, { name: "company", label: "Company" }, { name: "avatarUrl", label: "Avatar URL", type: "url" }, { name: "rating", label: "Rating", type: "number" },
    { name: "status", label: "Status", placeholder: "pending, approved, rejected" }, { name: "featured", label: "Featured", type: "checkbox" },
  ]} />;
}
