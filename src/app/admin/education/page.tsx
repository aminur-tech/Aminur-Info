import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminEducationPage() {
    return <ResourceEditor title="Education" description="Keep your academic background current and ordered." resource="education" fields={[
        { name: "institution", label: "Institution", required: true }, { name: "degree", label: "Degree", required: true }, { name: "field", label: "Field of study" },
        { name: "startDate", label: "Start date", type: "date" }, { name: "endDate", label: "End date", type: "date" }, { name: "grade", label: "Grade" },
        { name: "description", label: "Description", type: "textarea" }, { name: "url", label: "Institution URL", type: "url" }, { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
    ]} />;
}