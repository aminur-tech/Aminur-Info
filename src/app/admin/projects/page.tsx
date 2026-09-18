import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminProjectsPage() {
    return <ResourceEditor title="Projects" description="Publish the work that best represents your craft." resource="projects" fields={[
        { name: "title", label: "Title", required: true }, { name: "slug", label: "Slug", required: true }, { name: "shortDescription", label: "Short description", required: true },
        { name: "fullDescription", label: "Full description", type: "textarea" }, { name: "challenges", label: "Challenges", type: "textarea" }, { name: "solutions", label: "Solutions", type: "textarea" }, { name: "results", label: "Results", type: "textarea" },
        { name: "thumbnailUrl", label: "Thumbnail URL", type: "url" }, { name: "demoUrl", label: "Demo URL", type: "url" }, { name: "githubUrl", label: "GitHub URL", type: "url" },
        { name: "clientName", label: "Client name" }, { name: "clientUrl", label: "Client URL", type: "url" }, { name: "technologies", label: "Technologies (comma separated)" }, { name: "category", label: "Category" },
        { name: "startDate", label: "Start date", type: "date" }, { name: "completionDate", label: "Completion date", type: "date" },
        { name: "featured", label: "Featured", type: "checkbox" }, { name: "published", label: "Published", type: "checkbox" }, { name: "sortOrder", label: "Sort order", type: "number" },
    ]} />;
}