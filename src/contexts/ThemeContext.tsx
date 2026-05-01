import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

interface ThemeContextValue {
	isDark: boolean;
	toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
	isDark: false,
	toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		setIsDark(stored ? stored === "dark" : prefersDark);
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	return (
		<ThemeContext.Provider value={{ isDark, toggle: () => setIsDark((d) => !d) }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
