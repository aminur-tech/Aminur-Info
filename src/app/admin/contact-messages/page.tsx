import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminContactMessagesPage() {
  return <ResourceEditor title="Contact messages" description="Track enquiries submitted through your public contact form." resource="contact-messages" fields={[
    { name: "name", label: "Name", required: true }, { name: "email", label: "Email", required: true, type: "text" }, { name: "company", label: "Company" }, { name: "projectType", label: "Project type" }, { name: "budgetRange", label: "Budget range" }, { name: "subject", label: "Subject", required: true },
    { name: "message", label: "Message", required: true, type: "textarea" }, { name: "source", label: "Source" }, { name: "status", label: "Status", placeholder: "new, read, replied" }, { name: "starred", label: "Starred", type: "checkbox" },
  ]} />;
}
