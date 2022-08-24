import { createContext, useContext, useEffect, useState } from "react";

const darkContext = createContext({
	isDarkMode: false,
	changeTheme: () => {},
});

type childrenType = { children: JSX.Element | JSX.Element[] };

const theme = {
	DARK: "darkMode",
	LIGHT: "lightMode",
};

export function DarkProvider({ children }: childrenType) {
	const [isDark, setIsDark] = useState<boolean>(localStorage.getItem("theme") === theme.DARK);

	function changeTheme() {
		setIsDark(!isDark);
	}

	useEffect(() => {
		localStorage.setItem("theme", `${isDark ? theme.DARK : theme.LIGHT}`);
	}, [isDark]);

	return (
		<darkContext.Provider value={{ isDarkMode: isDark, changeTheme }}>
			{children}
		</darkContext.Provider>
	);
}

export function useIsDarkContext() {
	return useContext(darkContext);
}
