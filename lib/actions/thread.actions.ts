import Thread from "../models/thread.models";
import User from "../models/user.model";

interface Props {
	text: string;
	author: string;
	communityId: string | null;
	path: string;
}
export async function createThread({ text, author, communityId, path }: Props) {
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
}