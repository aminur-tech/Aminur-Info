import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminServicesPage() {
  return <ResourceEditor title="Services" description="Manage the services and business outcomes shown to prospective clients." resource="services" fields={[
    { name: "title", label: "Service title", required: true }, { name: "shortDescription", label: "Short description", required: true },
    { name: "fullDescription", label: "Full description", type: "textarea" }, { name: "features", label: "Features (items separated by colon)", type: "textarea" },
    { name: "deliveryTime", label: "Delivery time" }, { name: "featured", label: "Featured", type: "checkbox" },
    { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
  ]} />;
}