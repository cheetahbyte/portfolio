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
		links: [{ rel: "stylesheet", href: appCss },],
	}),
	// This wraps the entire application
	component: RootComponent,
	notFoundComponent: () => <p>Not Found</p>,
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
				className={`min-h-screen flex flex-col transition-colors duration-700 ease-in-out w-full`}
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

	return (
		<>

			<main
				className={`relative z-10 flex-1 transition-all duration-700 mx-auto px-8 max-w-4xl pt-32 w-1/2`}
			>
				<Outlet />
			</main>

		</>
	);
}
