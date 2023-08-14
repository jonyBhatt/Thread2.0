import Image from "next/image";

interface ProfileProps {
	accountId: string;
	authId: string;
	name: string;
	username: string;
	imgUrl: string;
	bio: string;
}
function ProfileHeader({
	accountId,
	authId,
	name,
	username,
	imgUrl,
	bio,
}: ProfileProps) {
	return (
		<div className="flex flex-col justify-start w-full">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3 relative h-20 w-20 object-cover">
					<Image
						src={imgUrl}
						alt="PP"
						fill
						className="rounded-full object-cover shadow-2xl"
					/>
				</div>
				<div className="flex-1 ml-2">
					<h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
					<p className="text-gray-1 text-base-medium">@{username}</p>
				</div>
			</div>
			{/* TODO: Community */}
			<p className="mt-6 ml-4 pb-1  text-light-2 max-w-lg">{bio}</p>
			<div className="w-full ml-4 h-0.5 bg-dark-3" />
		</div>
	);
}

export default ProfileHeader;
