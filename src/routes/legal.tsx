import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/legal")({
	component: ImprintPage,
});

function ImprintPage() {
	return (
		<div className=" max-w-3xl">
			<h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
				Legal
				<span className="ml-1 text-neutral-400">.</span>
			</h1>

			<p className="mt-3 text-base text-neutral-500">
				Information pursuant to sect. 5 German Telemedia Act{" "}
				<span className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-700">
					(TMG)
				</span>
			</p>

			<div className="mt-10 space-y-10 text-sm text-neutral-500">
				<section className="space-y-1">
					<p className="uppercase text-xs tracking-wider">Address</p>
					<p className="text-neutral-900">
						Leonhard Breuer
						<br />
						Buchenweg 7
						<br />
						63741 Aschaffenburg
					</p>
				</section>

				<section className="space-y-1">
					<p className="uppercase text-xs tracking-wider">Email</p>
					<button
						type="button"
						onClick={(event) => {
							event.preventDefault();
							const user = "mail";
							const domain = "leob.re";
							window.location.href = `mailto:${user}@${domain}`;
						}}
						className="text-neutral-900 underline underline-offset-4 cursor-pointer"
					>
						mail [at] leob [dot] re
					</button>
				</section>
			</div>
			<Link
				to="/"
				className="text-neutral-900 underline underline-offset-4 cursor-pointer text-sm flex flex-row gap-1 justify-center items-center w-fit"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Home
			</Link>
		</div>
	);
}
