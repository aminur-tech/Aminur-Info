import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminCertificatePage() {
    return <ResourceEditor title="Certifications" description="Add and publish the certificates displayed on your portfolio." resource="certifications" fields={[
        { name: "name", label: "Certificate name", required: true }, { name: "issuer", label: "Issuing organization", required: true },
        { name: "credentialId", label: "Credential ID" }, { name: "credentialUrl", label: "Credential URL", type: "url" },
        { name: "issueDate", label: "Issue date", type: "date" }, { name: "expiryDate", label: "Expiry date", type: "date" },
        { name: "imageUrl", label: "Certificate image", type: "image" }, { name: "description", label: "Description", type: "textarea" },
        { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
    ]} />;
}