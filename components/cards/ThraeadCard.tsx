import Image from "next/image";
import Link from "next/link";

interface Props {
	id: string;
	currentUserId?: string;
	content: string;
	parentId: string | null;
	author: {
		name: string;
		image: string;
		id: string;
	};
	community: {
		id: string;
		name: string;
		image: string;
	} | null;
	createdAt: string;
	comments: {
		author: {
			image: string;
		};
	}[];
	comment?: boolean;
	isComment?:boolean
}
const ThreadCard = ({
	id,
	currentUserId,
	parentId,
	content,
	author,
	community,
	createdAt,
	comments,
	isComment
}: Props) => {
	return (
		<article
			className={`w-full   flex flex-col rounded-xl ${
				isComment ? "px-0 sm:px-7" : "bg-dark-3 p-7"
			}`}>
			<div className="flex items-start justify-between">
				<div className="flex w-full flex-1 flex-row gap-4">
					<div className="flex items-center flex-col">
						<Link href={`/profile/${author.id}`} className="relative w-11 h-11">
							<Image
								src={author.image}
								alt="Pp"
								className="cursor-pointer rounded-full"
								width={50}
								height={50}
							/>
						</Link>
						<div className="thread-card_bar" />
					</div>
					<div className="flex flex-col w-full">
						<Link href={`/profile/${author.id}`} className="w-fit">
							<h4 className="cursor-pointer text-base-semibold text-light-1">
								{author.name}
							</h4>
						</Link>
						<p className=" mt-2 text-small-regular text-light-2">{content}</p>

						<div className="mt-5 flex flex-col gap-3">
							<div className="flex gap-3.5">
								<Image
									src="/assets/heart-gray.svg"
									alt="icon"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
								<Link href={`/thread/${id}`}>
									<Image
										src="/assets/reply.svg"
										alt="icon"
										width={24}
										height={24}
										className="cursor-pointer object-contain"
									/>
								</Link>

								<Image
									src="/assets/repost.svg"
									alt="icon"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
								<Image
									src="/assets/share.svg"
									alt="icon"
									width={24}
									height={24}
									className="cursor-pointer object-contain"
								/>
							</div>
							{
								// isComment &&
								comments.length > 0 && (
									<>
										<Link href={`/thread/${id}`}>
											<p className="text-[16px] text-white font-bold">
												{comments.length} replies
											</p>
										</Link>
									</>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};
export default ThreadCard;
