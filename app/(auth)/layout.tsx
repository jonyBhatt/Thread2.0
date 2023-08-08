import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "../globals.css"
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });

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
				elements: {
					formButtonPrimary: "bg-slate-500 hover:bg-slate-400",
				},
				layout: {
					socialButtonsPlacement: "bottom",
				},
			}}>
			<html lang="en">
				<body className={`${josef.className}  bg-dark-1`}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
