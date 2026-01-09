import { TanStackDevtools } from "@tanstack/react-devtools";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Outlet,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useStore } from "@tanstack/react-store";
import type * as React from "react";
import CommandBar from "@/components/CommandBar";
import Header from "@/components/Header";
import { appStore } from "@/lib/store";

import appCss from "@/styles.css?url";

/**
 * 1. Define the Context Type
 * This tells the router that a QueryClient will be available
 * in all loaders and components.
 */
interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Leonhard Breuer" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	// This wraps the entire application
	component: RootComponent,
});

/**
 * 2. RootComponent
 * This handles the React Query Provider and provides the
 * hydration point for the client.
 */
function RootComponent() {
	// Access the queryClient that was created in your router.tsx
	const { queryClient } = Route.useRouteContext();

	return (
		<QueryClientProvider client={queryClient}>
			<RootDocument>
				<RootLayout />
			</RootDocument>
		</QueryClientProvider>
	);
}

/**
 * 3. RootDocument
 * This is the physical HTML shell.
 */
function RootDocument({ children }: { children: React.ReactNode }) {
	const focusMode = useStore(appStore, (s) => s.focusMode);

	return (
		<html lang="en">
			<head>
				<HeadContent />
				<script
					src="https://cupcake.orbiq.one/api/script.js"
					data-site-id="1"
					defer
				></script>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋</text></svg>"
				/>
			</head>
			<body
				className={`min-h-screen flex flex-col transition-colors duration-700 ease-in-out ${
					focusMode
						? "bg-[#0A0F0E] text-[#A0A7A6]"
						: "bg-[#FAFAFA] text-[#1A1A1A]"
				} w-full`}
			>
				{children}

				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "TanStack Router",
							render: () => <TanStackRouterDevtoolsPanel />,
						},
						{
							name: "React Query",
							render: () => <ReactQueryDevtoolsPanel />,
						},
					]}
				/>

				<Scripts />
			</body>
		</html>
	);
}

/**
 * 4. RootLayout
 * Your UI wrapper with Tailwind and state logic.
 */
function RootLayout() {
	const location = useLocation();
	const isHomePage = location.pathname === "/";
	const focusMode = useStore(appStore, (s) => s.focusMode);

	return (
		<>
			{/* GRID OVERLAY */}
			<div
				className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
					focusMode ? "opacity-0" : "opacity-100"
				}`}
			>
				<div className="absolute inset-0 border-[0.5px] border-black/5 m-4 lg:m-8" />
				<div className="absolute top-0 left-1/4 bottom-0 w-[0.5px] bg-black/[0.03]" />
				<div className="absolute top-0 left-2/4 bottom-0 w-[0.5px] bg-black/[0.03]" />
				<div className="absolute top-0 left-3/4 bottom-0 w-[0.5px] bg-black/[0.03]" />
			</div>

			<Header />

			<main
				className={`relative z-10 flex-1 transition-all duration-700 mx-auto px-8 max-w-4xl pt-32 w-1/2`}
			>
				<Outlet />
			</main>

			{!focusMode && (
				<footer className="mt-auto mb-10 ml-10 mr-10 pt-8 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">
					<div>© 2026 LEONHARD BREUER</div>
					<div className="flex gap-6">
						<Link
							to="/imprint"
							className="hover:text-[#0E4D47] transition-colors"
						>
							Imprint
						</Link>
						<Link
							to="/privacy"
							className="hover:text-[#0E4D47] transition-colors"
						>
							Privacy Policy
						</Link>
					</div>
				</footer>
			)}

			<CommandBar />
		</>
	);
}
