import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminSiteSettingsPage() {
  return <ResourceEditor title="Site settings" description="Set the contact and footer details used by the site shell." resource="site-settings" singleton fields={[
    { name: "siteName", label: "Site name", required: true }, { name: "professionalTitle", label: "Professional title" }, { name: "shortBio", label: "Short bio", type: "textarea" },
    { name: "email", label: "Email" }, { name: "phone", label: "Phone" }, { name: "location", label: "Location" }, { name: "profileImageUrl", label: "Profile image URL", type: "url" },
    { name: "resumeUrl", label: "Resume URL", type: "url" }, { name: "availability", label: "Availability" }, { name: "footerText", label: "Footer text" }, { name: "copyrightText", label: "Copyright text" },
  ]} />;
}
