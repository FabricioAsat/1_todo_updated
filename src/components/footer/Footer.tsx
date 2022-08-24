import { BsGithub, BsLinkedin, BsWalletFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

export const Footer = () => {
	return (
		<div className="flex items-center justify-between h-full px-4 2xl:px-0 max-w-7xl mx-auto shortSize">
			<article className="flex flex-col w-full items-start sm:items-center gap-y-3 bg-inherit py-3">
				<h2 className="text-center mediumSize font-bold mx-auto">Contacts</h2>
				<nav className="flex flex-col sm:flex-row items-start sm:justify-center justify-start">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={import.meta.env.VITE_GITHUB_URL}
						className="flex items-center gap-x-2 px-4 py-1 hover:text-blue-400 transition-colors duration-300">
						<BsGithub />
						<small className="font-bold italic">GitHub</small>
					</a>

					<a
						target="_blank"
						rel="noopener noreferrer"
						href={import.meta.env.VITE_LINKEDIN_URL}
						className="flex items-center gap-x-2 px-4 py-1 hover:text-blue-400 transition-colors duration-300">
						<BsLinkedin />
						<small className="font-bold italic">LinkedIn</small>
					</a>

					<a
						target="_blank"
						rel="noopener noreferrer"
						href={import.meta.env.VITE_PORTFOLIO_URL}
						className="flex items-center gap-x-2 px-4 py-1 hover:text-blue-400 transition-colors duration-300">
						<BsWalletFill />
						<small className="font-bold italic">Portfolio</small>
					</a>

					<Mailto email={import.meta.env.VITE_MAIL} subject={""} body={""}>
						<SiGmail />
						<small>Gmail</small>
					</Mailto>
				</nav>
			</article>
		</div>
	);
};

const Mailto = ({
	email,
	subject = "",
	body = "",
	children,
}: {
	email: string;
	subject: string;
	body: string;
	children: JSX.Element | JSX.Element[];
}) => {
	let params = subject || body ? "?" : "";
	if (subject) params += `subject=${encodeURIComponent(subject)}`;
	if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

	return (
		<a
			href={`mailto:${email}${params}`}
			className="flex items-center gap-x-2 px-4 py-1 hover:text-blue-400 transition-colors duration-300">
			{children}
		</a>
	);
};
