import { useIsDarkContext } from "../../context/darkContext";
import { Logo } from "./Logo";

// ! Icons from react-icons
import { FiSun, FiMoon } from "react-icons/fi";

export const Header = () => {
	const { isDarkMode, changeTheme } = useIsDarkContext();

	return (
		<nav className="flex items-center justify-between h-full px-4 2xl:px-0 max-w-7xl mx-auto">
			<Logo />

			{isDarkMode ? (
				<button className="lowLongSize text-yellow-400" onClick={changeTheme}>
					<FiSun />
				</button>
			) : (
				<button className="lowLongSize text-blue-400" onClick={changeTheme}>
					<FiMoon />
				</button>
			)}
		</nav>
	);
};
