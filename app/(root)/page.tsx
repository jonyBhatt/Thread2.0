import { FetchThreads } from "@/components/shared";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<>
			<h1 className="head-text">Home</h1>
			<FetchThreads />
		</>
	);
}
