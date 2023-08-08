import { AccountProfile } from "@/components/form";
import React from "react"; 
import {currentUser} from '@clerk/nextjs'

type Props = {};

const OnBoarding = async (props: Props) => {
	// const user =await currentUser()
	const user = {
		name: "kk00",
		bio: "koooooooo",
		image: "",
		username:"hello"
	}
	return <main className="text-white flex mx-auto flex-col justify-start max-w-3xl px-10 py-20">
		<h1 className="head-text">Onboarding</h1>
		<p className="mt-3 text-base-regular text-light-2">Complete your profile to continue Thread</p>

		<section className="mt-9 bg-dark-2 p-10">
			<AccountProfile user={user} btnTitle="Continue Thread" /> 
		</section>
	</main>;
};

export default OnBoarding;
