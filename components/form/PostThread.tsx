"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePathname, useRouter } from "next/navigation";
import { threadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
// import { UpdateUser } from "@/lib/actions/user.actions";

interface Props {
	user: {
		name: string;
		bio: string;
		username: string;
		image: string;
		id: string;
		objectId: string;
	};
	btnTitle: string;
}
async function PostThread({ userId }: { userId: string }) {
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof threadValidation>>({
		resolver: zodResolver(threadValidation),
		defaultValues: {
			threads: "",
			accountId: userId,
		},
	});
	const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        // console.log(values);
        await createThread({
					text: values.threads,
					author: userId,
					communityId:null,
					path:pathname,
				});
	};
	return (
		<>
			{/* <h1 className="text-gray-400/[.8] font-bold">Post Thread</h1> */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-10 mt-10 justify-start">
					<FormField
						control={form.control}
						name="threads"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel className="text-base-semibold text-light-3">
									Content
								</FormLabel>
								<FormControl className="flex-1 text-base-semibold text-gray-200">
									<Textarea
										rows={20}
										className="account-form_input no-focus"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="bg-primary-500">
						Post Thread
					</Button>
				</form>
			</Form>
		</>
	);
}

export default PostThread;
