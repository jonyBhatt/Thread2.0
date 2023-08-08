"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
function BottomBar() {
	// const router = useRouter();
	const pathname = usePathname();
	return (
		<section className="bottombar">
			<div className="bottombar_container">
				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;
					return (
						<Link
							href={link.route}
							key={link.label}
							className={`bottombar_link ${
								isActive ? "bg-primary-500" : ""
							}`}>
							<Image src={link.imgURL} alt="nav_menu" width={24} height={24} />
							<p className="max-sm:hidden text-subtle-medium text-light-1">{link.label.split(/\s./)[0]}</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

export default BottomBar;
