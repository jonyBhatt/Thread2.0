
import { fetchUserPost } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThreadCard from "../cards/ThraeadCard";

type Props = {
	currentUserId: string;
	accountId: string;
	accountType: string;
};

const ThreadTab = async ({ currentUserId, accountId, accountType }: Props) => {
    
	const result = await fetchUserPost(accountId);
	// console.log(result.threads);

	return (
		<div className="mt-9 text-light-1 flex flex-col gap-10">
			{result.threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentUserId}
					parentId={thread.parentId}
					content={thread.text}
                    author={
                        accountType === 'User'?{name:result.name, image:result.image, id:result.id}:{name:thread.author.name, image:thread.author.image, id:thread.author.id}
                    }
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
				/>
			))}
		</div>
	);
};

export default ThreadTab;
