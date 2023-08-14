"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface CommentProps {
	threadId: string;
	currentUserImage: string;
	currentUserId: string;
}
function Comment({ threadId, currentUserImage, currentUserId }: CommentProps) {
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof CommentValidation>>({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		// console.log(values);
		await addCommentToThread(threadId,values.thread,JSON.parse(currentUserId),pathname);

		// router.push("/");
		form.reset()
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="comment-form">
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex items-center gap-3 w-full">
							<FormLabel className="">
								<Image src={currentUserImage} alt="PP" width={48} height={48} className="rounded-full object-cover" />
							</FormLabel>
							<FormControl className="border-none bg-transparent">
								<Input
                                    type="text"
                                    placeholder="Comment.."
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="comment-form_btn">
					Reply
				</Button>
			</form>
		</Form>
	);
}

export default Comment;
