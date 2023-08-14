"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.model";
import { connectDB } from "../mongoose";

interface Props {
	text: string;
	author: string;
	communityId: string | null;
	path: string;
}
export async function createThread({ text, author, communityId, path }: Props) {
	try {
		connectDB();
		//* First we create new thread then we have push it by it's owner(author)

		const createThreads = await Thread.create({
			text,
			author,
			community: null,
		});

		// TODO: we have to push the thread by user means which user create the thread

		await User.findByIdAndUpdate(author, {
			$push: { threads: createThreads._id },
		});
		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Something wrong in thread action ${error.message}`);
	}
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
	connectDB();
	const skipAmount = (pageNumber - 1) * pageSize;
	const threadQuery = Thread.find({
		parentId: { $in: [null, undefined] },
	})
		.skip(skipAmount)
		.sort({ createdAt: "desc" })
		.limit(pageSize)
		.populate({ path: "author", model: User })
		.populate({
			path: "children",
			populate: {
				path: "author",
				model: User,
				select: "_id name image parentId", //TODO: add
			},
		});

	const totalThreads = await Thread.countDocuments({
		parentId: { $in: [null, undefined] },
	});

	const posts = await threadQuery.exec();
	const isNext = totalThreads > skipAmount + posts.length;
	return { posts, isNext };
}

export async function fetchThreadById(id: string) {
	connectDB();
	try {
		const thread = await Thread.findById(id)
			.populate({
				path: "author",
				model: User,
				select: "_id id parentId image",
			})
			.populate({
				path: "children",
				populate: [
					{
						path: "author",
						model: User,
						select: "_id id parentId image",
					},
					{
						path: "children",
						model: Thread,
						populate: {
							path: "author",
							model: User,
							select: "_id id parentId image",
						},
					},
				],
			})
			.exec();
		return thread;
	} catch (error) {
		console.log(error);
	}
}

export async function addCommentToThread(
	threadId: string,
	commentText: string,
	userId: string,
	path: string,
) {
	connectDB();
	try {
		//find the original thread
		const originalThread = await Thread.findById(threadId);
		if (!originalThread) {
			throw new Error("No such thread");
		}
		//comment thread at original thread
		const commentThread = new Thread({
			text: commentText,
			author: userId,
			parentId: threadId,
		});

		//save commentThread
		const saveComment = await commentThread.save();

		// push the comment to the original thread or update the original  thread
		originalThread.children.push(saveComment._id);

		//save the original thread
		await originalThread.save();
		//update path of all threads in this tree
		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Something wrong to add comment ${error.message}`);
	}
}
