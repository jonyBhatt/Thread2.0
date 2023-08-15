import { fetchUser, getActivities } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props{

}


const Page = async (props: Props) => {
	const user = await currentUser()
	if (!user) return null;
	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) return redirect("/onboarding");
	const result = await getActivities(userInfo._id)
	console.log(result);
	

	
	return <div>Activity</div>;
};

export default Page;
