import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/imprint")({
	component: ImprintPage,
});

function ImprintPage() {
	return <p>Impressum</p>;
}
