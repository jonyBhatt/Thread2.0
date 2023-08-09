"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connectDB } from "../mongoose"
interface Params{
    userId: string,
    name: string,
    username: string,
    bio: string,
    image: string,
    path: string,
    
}
export async function UpdateUser(
	{userId,
	name,
	username,
	bio,
	image,
	path,}: Params
	
): Promise<void> {
	connectDB();

	try {
         await User.findOneAndUpdate(
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
    } catch (error:any) {
        throw new Error(`Failed to update/create user for ${error.message}`);
        
    }
}