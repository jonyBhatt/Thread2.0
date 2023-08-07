"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

function LeftSideBar() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<section className="custom-scrollbar leftsidebar">
			<div className="flex flex-1 cursor-pointer flex-col gap-6 py-4 px-6 w-full">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`leftsidebar_link ${
								isActive ? "bg-primary-500" : ""
							}`}>
							<Image src={link.imgURL} alt="nav_menu" width={24} height={24} />
							<p className="max-lg:hidden text-white">{link.label}</p>
						</Link>
					);
				})}
			</div>
			<div className="mt-10 px-6 ">
				<SignedIn>
					<SignOutButton signOutCallback={()=>router.push("/sign-in")}>
						<div className="flex cursor-pointer gap-4 p-4">
							<Image
								src={"/assets/logout.svg"}
								alt="Logout "
								width={24}
								height={24}
							/>
							<p className="max-lg:hidden text-white">Log Out</p>
						</div>
					</SignOutButton>
				</SignedIn>
			</div>
		</section>
	);
}

export default LeftSideBar;
