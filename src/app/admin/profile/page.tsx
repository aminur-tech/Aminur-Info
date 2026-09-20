import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminProfilePage() {
  return <ResourceEditor title="Profile" description="Maintain the personal details used across your portfolio." resource="profile" singleton fields={[
    { name: "name", label: "Name", required: true }, { name: "title", label: "Professional title", required: true }, { name: "shortBio", label: "Short bio", type: "textarea" },
    { name: "longBio", label: "Long bio", type: "textarea" }, { name: "profileImageUrl", label: "Profile image", type: "image" }, { name: "email", label: "Email" },
    { name: "phone", label: "Phone" }, { name: "location", label: "Location" }, { name: "resumeUrl", label: "Resume URL", type: "url" }, { name: "availabilityStatus", label: "Availability status" }, { name: "isPublic", label: "Public profile", type: "checkbox" },
  ]} />;
}
