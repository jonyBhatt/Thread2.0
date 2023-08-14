"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDB } from "../mongoose";
import { string } from "zod";
import Thread from "../models/thread.models";
interface Params {
	userId: string;
	name: string;
	username: string;
	bio: string;
	image: string;
	path: string;
}

export async function UpdateUser({
	userId,
	name,
	username,
	bio,
	image,
	path,
}: Params): Promise<void> {
	connectDB();

	try {
		const user = await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true,
			},
			{
				upsert: true,
			},
		);
		if (path === "/profile/edit") {
			revalidatePath(path);
		}

		console.log(user);
	} catch (error: any) {
		throw new Error(`Failed to update/create user for ${error.message}`);
	}
}

export async function fetchUser(userId: string) {
	try {
		connectDB();
		return await User.findOne({ id: userId });
	} catch (error: any) {
		throw new Error(`Fetch problem in ${error.message}`);
	}
}

export async function fetchUserPost(userId: string) {
	try {
		connectDB();

		//* Find Post by user id
		const posts = await User.findOne({ id: userId }).populate({
			path: "threads",
			model: Thread,
			populate: {
				path: "children",
				model: Thread,
				populate: {
					path: "author",
					model: User,
					select: "name id image",
				},
			},
		});

		return posts;
	} catch (error: any) {
		throw new Error(`Fetch problem in ${error.message}`);
	}
}
