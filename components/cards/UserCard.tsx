"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
type Props = {
	name: string;
	username: string;
	imgUrl: string;
	personType: string;
	id: string;
};

const UserCard = ({ name, username, imgUrl, personType, id }: Props) => {
    const route = useRouter()
	return (
		<article className="user-card">
			<div className="user-card_avatar">
				<Image
					src={imgUrl}
					alt="PP"
					width={48}
					height={48}
					className="rounded-full object-contain"
				/>
				<div className="flex-1 text-ellipsis">
					<h3 className="text-regular-semibold text-light-1">{name}</h3>
					<p className="text-regular-medium text-gray-1">@{username}</p>
				</div>
			</div>

			<Button
				className="user-card_btn"
				onClick={() => route.push(`/profile/${id}`)}>
				View
			</Button>
		</article>
	);
};

export default UserCard;
