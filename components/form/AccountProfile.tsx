"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { UpdateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
	user: {
		name: string;
		bio: string;
		username: string;
		image: string;
		id: string;
		objectId:string
	};
	btnTitle: string;
}
const AccountProfile = ({ user, btnTitle }: Props) => {
	const [file, setFile] = useState<File[]>([]);
	const { startUpload } = useUploadThing("media");
	const router = useRouter();
	const pathname = usePathname()

	const form = useForm<z.infer<typeof userValidation>>({
		resolver: zodResolver(userValidation),
		defaultValues: {
			profile_photo: user?.image || "",
			name: user?.name || "",
			username: user?.username || "",
			bio: user?.bio || "",
		},
	});
	const onSubmit = async (values: z.infer<typeof userValidation>) => {
		// console.log(values);
		const blob = values?.profile_photo;

		const hasImageChange = isBase64Image(blob);

		if (hasImageChange) {
			//upload in uploadthing
			const imgRes = await startUpload(file);

			if (imgRes && imgRes[0].fileUrl) {
				values.profile_photo = imgRes[0].fileUrl
			}
		}

		// ToDo: update user profile
		await UpdateUser({
			userId:user.id,
			name: values.name,
			username: values.username,
			bio: values.bio,
			image: values.profile_photo,
			path:pathname
		})

		if (pathname === '/profile/edit') {
			router.back()
		} else {
			router.push('/')
		}
	};
	const handleImage = async (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void,
	) => {
		e.preventDefault();

		const fileReader = new FileReader();
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			setFile(Array.from(e.target.files));

			if (!file.type.includes("image")) return;
			fileReader.onload = async (event) => {
				const imgDataUrl = event.target?.result?.toString() || "";

				fieldChange(imgDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-10 justify-start">
				<FormField
					control={form.control}
					name="profile_photo"
					render={({ field }) => (
						<FormItem className="flex items-center gap-4">
							<FormLabel className="account-form_image-label">
								{field.value ? (
									<Image
										src={field.value}
										alt="profile_photo"
										width={96}
										height={96}
										priority
										className="rounded-full object-contain"
									/>
								) : (
									<Image
										src="/assets/profile.svg"
										alt="profile_photo"
										width={24}
										height={24}
										className=" object-contain"
									/>
								)}
							</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Input
									type="file"
									accept="image/*"
									placeholder="Upload profile picture"
									className="account-form_image-input"
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-3 w-full">
							<FormLabel className="text-base-semibold">Name</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Input
									type="text"
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex gap-3 w-full flex-col">
							<FormLabel className="text-base-semibold">Username</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Input
									type="text"
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-3 w-full">
							<FormLabel className="text-base-semibold">Bio</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Textarea
									rows={10}
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-primary-500">
					{btnTitle}
				</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;
