import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import {
	BottomBar,
	LeftSideBar,
	RightSideBar,
	TopBar,
} from "@/components/shared";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Thread2.0",
	description: "A nextjs application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
			appearance={{
				baseTheme: dark,
			}}>
			<html lang="en">
				<body className={`${inter.className} `}>
					<TopBar />
					<main className="flex flex-row">
						<LeftSideBar />
						<section className="main-container">
							<div className="w-full max-w-4xl">{children}</div>
						</section>
						<RightSideBar />
					</main>
					<BottomBar />
				</body>
			</html>
		</ClerkProvider>
	);
}
