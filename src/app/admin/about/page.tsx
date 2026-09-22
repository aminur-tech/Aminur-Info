import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminAboutPage() {
    return <ResourceEditor title="About section" description="Shape the story and highlights shown on your profile." resource="about" singleton fields={[
        { name: "title", label: "Title", required: true }, { name: "description", label: "Description", type: "textarea" },
        { name: "imageUrl", label: "About image", type: "image" }, { name: "highlights", label: "Highlights (items separated by colon)", separator: ":" }, { name: "values", label: "Values (items separated by colon)", separator: ":" },
    ]} />;
}