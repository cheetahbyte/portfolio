import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { appStore } from "@/lib/store";

export const Route = createFileRoute("/privacy")({
	component: RouteComponent,
});

function RouteComponent() {
	const focusMode = useStore(appStore, (s) => s.focusMode);

	const ui = {
		container: `animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 ${
			focusMode ? "max-w-3xl mx-auto" : ""
		}`,
		title: `font-mono text-sm border-b pb-2 mb-12 uppercase tracking-tighter ${
			focusMode ? "border-white/10" : "border-black/10"
		}`,
		label: `font-mono text-[10px] uppercase tracking-widest mb-4 ${
			focusMode ? "text-white/40" : "text-black/40"
		}`,
		primary: focusMode ? "text-white/80" : "text-black/80",
		secondary: focusMode ? "text-white/60 italic" : "text-black/60 italic",
		legalText: "text-sm leading-relaxed space-y-4",
	};

	return (
		<div className={ui.container}>
			<h2 className={ui.title}>Privacy Policy / Datenschutzerklärung</h2>
			<p className="font-sans text-[10px] mb-12 opacity-50">
				Stand: 06. Januar 2026
			</p>

			<div className="space-y-16 font-sans">
				{/* 1. Controller / Verantwortlicher */}
				<section className="grid md:grid-cols-2 gap-8">
					<div>
						<h3 className={ui.label}>EN / Controller</h3>
						<div className={`${ui.legalText} ${ui.primary}`}>
							<p>
								Leonhard Breuer
								<br />
								Buchenweg 7, 63741 Aschaffenburg, Germany
								<br />
								Email:{" "}
								<a href="mailto:mail@leonhardbreuer.de" className="underline">
									mail@leonhardbreuer.de
								</a>
							</p>
						</div>
					</div>
					<div>
						<h3 className={ui.label}>DE / Verantwortlicher</h3>
						<div className={`${ui.legalText} ${ui.secondary}`}>
							<p>
								Leonhard Breuer
								<br />
								Buchenweg 7, 63741 Aschaffenburg, Deutschland
								<br />
								E-Mail:{" "}
								<a href="mailto:mail@leonhardbreuer.de" className="underline">
									mail@leonhardbreuer.de
								</a>
							</p>
						</div>
					</div>
				</section>

				{/* 2. Legal Basis / Rechtsgrundlagen */}
				<section className="grid md:grid-cols-2 gap-8 border-t border-black/5 pt-8">
					<div>
						<h3 className={ui.label}>EN / Legal Framework</h3>
						<div className={`${ui.legalText} ${ui.primary}`}>
							<p>
								We process data according to <strong>Art. 6 GDPR</strong>. This
								includes consent (lit. a) and legitimate interests (lit. f),
								such as maintaining IT infrastructure and security.
							</p>
						</div>
					</div>
					<div>
						<h3 className={ui.label}>DE / Rechtsgrundlagen</h3>
						<div className={`${ui.legalText} ${ui.secondary}`}>
							<p>
								Die Verarbeitung erfolgt nach <strong>Art. 6 DSGVO</strong>.
								Maßgeblich sind Einwilligungen (lit. a) sowie berechtigte
								Interessen (lit. f), etwa die Sicherheit und Funktionalität des
								Onlineangebots.
							</p>
						</div>
					</div>
				</section>

				{/* 3. Hosting & Infrastructure */}
				<section className="grid md:grid-cols-2 gap-8 border-t border-black/5 pt-8">
					<div>
						<h3 className={ui.label}>EN / Infrastructure</h3>
						<div className={`${ui.legalText} ${ui.primary}`}>
							<p>
								<strong>Hetzner:</strong> Managed storage and server capacity in
								Germany. Server log files (IP, time, browser) are stored for{" "}
								<strong>30 days</strong>
								to prevent abuse (DDoS) and then anonymized.
							</p>
							<p>
								<strong>Cloudflare:</strong> CDN and security. Data transfer to
								the USA is secured via the{" "}
								<strong>Data Privacy Framework (DPF)</strong>.
							</p>
						</div>
					</div>
					<div>
						<h3 className={ui.label}>DE / Infrastruktur</h3>
						<div className={`${ui.legalText} ${ui.secondary}`}>
							<p>
								<strong>Hetzner:</strong> Hosting in Deutschland.
								Server-Logfiles werden maximal <strong>30 Tage</strong> zu
								Sicherheitszwecken gespeichert und anschließend anonymisiert.
							</p>
							<p>
								<strong>Cloudflare:</strong> Schutz und Performance.
								Datentransfers in die USA sind durch das{" "}
								<strong>Data Privacy Framework (DPF)</strong> abgesichert.
							</p>
						</div>
					</div>
				</section>

				{/* 4. Analytics */}
				<section className="grid md:grid-cols-2 gap-8 border-t border-black/5 pt-8">
					<div>
						<h3 className={ui.label}>EN / Analytics (Rybbit)</h3>
						<div className={`${ui.legalText} ${ui.primary}`}>
							<p>
								We use self-hosted analytics for reach measurement. IP addresses
								are masked (pseudonymized). No cookies are stored unless stated
								otherwise.
							</p>
						</div>
					</div>
					<div>
						<h3 className={ui.label}>DE / Analyse (Rybbit)</h3>
						<div className={`${ui.legalText} ${ui.secondary}`}>
							<p>
								Wir nutzen selbstgehostete Webanalyse zur Reichweitenmessung.
								IP-Adressen werden durch <strong>IP-Masking</strong> gekürzt. Es
								werden keine Klardaten (Namen/E-Mails) verarbeitet.
							</p>
						</div>
					</div>
				</section>

				{/* 5. Rights */}
				<section className="grid md:grid-cols-2 gap-8 border-t border-black/5 pt-8">
					<div>
						<h3 className={ui.label}>EN / Your Rights</h3>
						<div className={`${ui.legalText} ${ui.primary}`}>
							<ul className="list-disc pl-4 space-y-1">
								<li>Right to access (Art. 15)</li>
								<li>Right to rectification (Art. 16)</li>
								<li>Right to erasure (Art. 17)</li>
								<li>Right to object (Art. 21)</li>
								<li>Right to lodge a complaint with a supervisory authority</li>
							</ul>
						</div>
					</div>
					<div>
						<h3 className={ui.label}>DE / Ihre Rechte</h3>
						<div className={`${ui.legalText} ${ui.secondary}`}>
							<ul className="list-disc pl-4 space-y-1">
								<li>Auskunftsrecht (Art. 15)</li>
								<li>Recht auf Berichtigung (Art. 16)</li>
								<li>Recht auf Löschung (Art. 17)</li>
								<li>Widerspruchsrecht (Art. 21)</li>
								<li>Beschwerderecht bei einer Aufsichtsbehörde</li>
							</ul>
						</div>
					</div>
				</section>

				{/* 6. Legal Seal */}
				<footer className="pt-12 border-t border-black/5 opacity-30 text-[10px] uppercase font-mono tracking-widest">
					<p>Erstellt mit Datenschutz-Generator.de von Dr. Thomas Schwenke</p>
				</footer>
			</div>
		</div>
	);
}
