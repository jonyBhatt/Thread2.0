import { fetchUser, getActivities } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props{

}


const Page = async (props: Props) => {
	const user = await currentUser()
	if (!user) return null;
	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) return redirect("/onboarding");
	const result = await getActivities(userInfo._id)
	// console.log();
	// if (result.length > 0) {
	// 	console.log(result);
		
	// }
	
	

	
	return (
		<>
			<h1 className="head-text">Activity</h1>
			<div className="mt-10 flex flex-col gap-5">
				{result.length > 0 ? (
					<>
						{result.map((activity) => (
							<Link key={activity.id} href={`/threads/${activity.parentId}`}>
								<article className="activity-card">
									<Image
										src={activity.author.image}
										alt="pp"
										width={48}
										height={48}
										className="rounded-full object-cover"
									/>
									<p className="text-small-regular text-light-1">
										<span className="mr-1 text-purple-500">
											{activity.author.name}
										</span>
										replied to your comment
									</p>
								</article>
							</Link>
						))}
					</>
				) : (
					<>
						<p className="!text-base-regular text-light-3">No activity yet</p>
					</>
				)}
			</div>
		</>
	);
};

export default Page;
