import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { appStore } from "@/lib/store";

export const Route = createFileRoute("/imprint")({
	component: ImprintPage,
});

function ImprintPage() {
	const focusMode = useStore(appStore, (s) => s.focusMode);

	const ui = {
		container: `animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 ${
			focusMode ? "max-w-2xl mx-auto" : ""
		}`,
		title: `font-sans text-sm border-b pb-2 mb-12 uppercase tracking-tighter ${
			focusMode ? "border-white/10" : "border-black/10"
		}`,
		label: `font-sans text-[10px] uppercase tracking-widest mb-2 ${
			focusMode ? "text-white/40" : "text-black/40"
		}`,
		primary: focusMode ? "text-white/80" : "text-black/80",
		secondary: focusMode ? "text-white/60" : "text-black/60",
	};

	return (
		<div className={ui.container}>
			<h2 className={ui.title}>Legal Notice / Impressum</h2>

			<div className="grid md:grid-cols-2 gap-12 font-sans">
				{/* LEFT: Operator / Responsible */}
				<div className="space-y-12">
					<section>
						<h3 className={ui.label}>Site operator</h3>
						<p className={`text-base ${ui.primary}`}>
							Leonhard Breuer
							<br />
							Buchenweg 7
							<br />
							63741 Aschaffenburg
							<br />
							Germany
						</p>
					</section>

					<section>
						<h3 className={ui.label}>Angaben gemäß § 5 TMG</h3>
						<p className={`text-base ${ui.secondary}`}>
							Leonhard Breuer
							<br />
							Buchenweg 7
							<br />
							63741 Aschaffenburg
							<br />
							Deutschland
						</p>
					</section>

					<section>
						<h3 className={ui.label}>Responsible for content</h3>
						<p className={`text-sm leading-relaxed ${ui.primary}`}>
							<span className={`block mb-2 ${ui.secondary}`}>
								Verantwortlich i.S.d. § 18 Abs. 2 MStV:
							</span>
							Leonhard Breuer
							<br />
							Buchenweg 7
							<br />
							63741 Aschaffenburg
						</p>
					</section>
				</div>

				{/* RIGHT: Contact / Legal */}
				<div className="space-y-12">
					<section>
						<h3 className={ui.label}>Contact</h3>
						<p className={`text-base ${ui.primary}`}>
							<a
								className="underline underline-offset-4 decoration-current/30 hover:decoration-current/70"
								href="mailto:mail@leonhardbreuer.de"
							>
								mail@leonhardbreuer.de
							</a>
						</p>
					</section>

					<section>
						<h3 className={ui.label}>Disclaimer</h3>
						<div
							className={`text-xs space-y-4 leading-relaxed ${ui.secondary}`}
						>
							<p>
								<strong className={ui.primary}>Content:</strong> I create the
								contents of this website with care. However, I cannot guarantee
								correctness, completeness, or timeliness.
							</p>
							<p>
								<strong className={ui.primary}>Links:</strong> This website may
								contain links to external third-party sites. I have no influence
								over their content and therefore cannot assume liability.
							</p>
						</div>
					</section>

					<section>
						<h3 className={ui.label}>Copyright</h3>
						<p className={`text-xs leading-relaxed ${ui.secondary}`}>
							The content and works on these pages created by the site operator
							are subject to German copyright law. Any use beyond the limits of
							copyright law requires prior written consent.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
