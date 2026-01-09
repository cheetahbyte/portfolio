import { useStore } from "@tanstack/react-store";
import { appStore } from "@/lib/store";

interface HeaderBarProps {
	title: string;
	searchQuery: string;
	setSearchQuery: (val: string) => void;
}

const HeaderBar = ({ title, searchQuery, setSearchQuery }: HeaderBarProps) => {
	const focusMode = useStore(appStore, (s) => s.focusMode);
	return (
		<div className="flex items-center justify-between gap-4 mb-8">
			<h2
				className={`font-sans text-sm border-b pb-2 uppercase tracking-tighter flex-1 ${
					focusMode ? "border-white/10" : "border-black/10"
				}`}
			>
				{title}
			</h2>

			<input
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search projects…"
				className={`hidden md:block font-mono text-xs px-3 py-2 rounded border outline-none transition-colors ${
					focusMode
						? "bg-white/5 border-white/10 text-white placeholder:text-white/20"
						: "bg-white border-black/10 text-black placeholder:text-black/30"
				}`}
			/>
		</div>
	);
};

export default HeaderBar;
