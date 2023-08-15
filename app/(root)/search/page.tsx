import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

import Image from "next/image";
import UserCard from "@/components/cards/UserCard";

async function Page() {
	const user = await currentUser();
	if (!user) return null;
	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) return redirect("/onboarding");
	const result = await fetchUsers({
		userId: user.id,
		searchString: "",
		pageNumber: 1,
		pageSize: 22,
	});
	// console.log(result);

	return (
		<section>
			<h1 className="head-text mb-10">Search</h1>
			<div className="mt-10 flex flex-col gap-9">
				{result.users.length === 0 ? (
					<p>There is no user</p>
				) : (
					<>
						{result.users.map((person) => (
							<UserCard key={person.id} name={person.name} username={person.username} imgUrl={person.image} personType="User" id={person.id} />
						))}
					</>
				)}
			</div>
		</section>
	);
}

export default Page;
