import { useIsDarkContext } from "../../context/darkContext";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

type layoutType = {
	children: JSX.Element | JSX.Element[];
};

export const Layout = ({ children }: layoutType) => {
	const { isDarkMode } = useIsDarkContext();

	return (
		<div
			className={`transition-colors duration-300 ${
				isDarkMode ? "bg-darkLight text-lightLight" : "bg-lightLight text-darkLight"
			}`}>
			<header
				className={`h-14 md:h-16 xl:h-20 text-lightLight select-none shadow-md ${
					isDarkMode ? "bg-darkDark shadow-darkDark" : "bg-darkLight shadow-darkLight"
				}`}>
				<Header />
			</header>

			<main className="flex flex-col items-center gap-y-10 min-h-screen h-full 2xl:px-0 max-w-7xl mx-auto px-1 sm:px-4 py-8">
				{children}
			</main>

			<footer
				className={`text-lightLight select-none ${isDarkMode ? "bg-darkDark" : "bg-darkLight"}`}>
				<Footer />
			</footer>
		</div>
	);
};
