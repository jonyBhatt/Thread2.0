import { fetchThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThraeadCard";
import { currentUser } from "@clerk/nextjs";

async function FetchThreads() {
	const results = await fetchThreads(1, 30);
	const user = await currentUser();
	// console.log(results);

	return (
		<section className="mt-9 flex flex-col gap-10">
			{results.posts.length === 0 ? (
				<>
					<p className="no-result">There is not post yet</p>
				</>
			) : (
				<>
					{results.posts.map((post) => (
						<ThreadCard
							key={post._id}
							id={post._id}
							currentUserId={user?.id}
							parentId={post.parentId}
							content={post.text}
							author={post.author}
							community={post.community}
							createdAt={post.createdAt}
							comments={post.children}
						/>
					))}
				</>
			)}
		</section>
	);
}

export default FetchThreads;
