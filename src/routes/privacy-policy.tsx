import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy-policy")({
	component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
	return (
		<div className="max-w-3xl">
			<p>Coming Soon</p>

			<Link
				to="/"
				className="text-neutral-900 underline underline-offset-4 cursor-pointer text-sm flex flex-row gap-1 justify-center items-center w-fit mt-10"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Home
			</Link>
		</div>
	);
}
