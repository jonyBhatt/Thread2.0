"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDB } from "../mongoose";
import { string } from "zod";
import Thread from "../models/thread.models";
import { FilterQuery, SortOrder } from "mongoose";
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

export async function fetchUsers({
	userId,
	searchString = "",
	pageNumber = 1,
	pageSize = 20,
	sortBy = "desc",
}: {
	userId: string;
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}) {
	try {
		connectDB();
		//skip amount
		const skip = (pageNumber - 1) * pageSize;

		// letter will be case insensitive
		const regex = new RegExp(searchString, "i");

		// filter current user
		const query: FilterQuery<typeof User> = {
			id: { $ne: userId },
		};
		if (searchString.trim() !== "") {
			query.$or = [{ username: regex }, { name: regex }];
		}

		//define sort
		const sortOptions = { createdAt: sortBy };
		// now fetch user by query, sort options, skip amount and limit
		const userQuery = User.find(query)
			.sort(sortOptions)
			.limit(pageSize)
			.skip(skip);

		// count total amount of users
		const usersCount = await User.countDocuments(query);

		//execute the user query
		const users = await userQuery.exec();

		// check is there next page available
		const isNextPage = usersCount > skip + users.length;
		return { users, isNextPage };
	} catch (error: any) {
		throw new Error(`Fetch problem in fetch users ${error.message}`);
	}
}

export async function getActivities(userId: string) {
	try {
		connectDB();
		// Find all threads created by the user
		const userThreads = await Thread.find({ author: userId });

		// Collect all the child thread ids (replies) from the 'children' field of each user thread
		const childThreadIds = userThreads.reduce((acc, userThread) => {
			return acc.concat(userThread.children);
		}, []);

		// Find and return the child threads (replies) excluding the ones created by the same user
		const replies = await Thread.find({
			_id: { $in: childThreadIds },
			author: { $ne: userId }, // Exclude threads authored by the same user
		}).populate({
			path: "author",
			model: User,
			select: "name image _id",
		});

		return replies;
	} catch (error: any) {
		throw new Error(`Fetch problem in activity ${error.message}`);
	}
}
