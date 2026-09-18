import ResourceEditor from "../../../components/admin/ResourceEditor";

export default function AdminHeroPage() {
    return <ResourceEditor title="Hero section" description="Control the first impression on your public portfolio." resource="hero" singleton fields={[
        { name: "heading", label: "Heading", required: true }, { name: "highlightedText", label: "Highlighted text" },
        { name: "description", label: "Description", type: "textarea" }, { name: "primaryCtaLabel", label: "Primary CTA label" },
        { name: "primaryCtaUrl", label: "Primary CTA URL", type: "url" }, { name: "secondaryCtaLabel", label: "Secondary CTA label" },
        { name: "secondaryCtaUrl", label: "Secondary CTA URL", type: "url" }, { name: "availabilityBadge", label: "Availability badge" },
        { name: "imageUrl", label: "Hero image", type: "image" }, { name: "backgroundUrl", label: "Background image", type: "image" },
    ]} />;
}