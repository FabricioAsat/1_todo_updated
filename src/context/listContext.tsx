import { createContext, useContext, useRef, useState } from "react";

type childrenType = {
	children: JSX.Element | JSX.Element[];
};

export type listType = {
	id: string;
	title: string;
	doit: boolean;
};

type dataToEditType = {
	editing: boolean;
	id: string;
};

const listContext = createContext({
	inputValue: "",
	dataToEdit: { editing: false, id: "" },
	changeInputValue: (value: string, data?: dataToEditType) => {},

	inputRef: {},
	list: [{ id: "", title: "", doit: false }],

	putRefInInput: () => {},
	createTask: (title: string) => {},
	checkTask: (id: string) => {},
	editTask: (id: string, newTitle: string) => {},
	deleteTask: (id: string) => {},
	deleteAllTask: () => {},
});

export function ListProvider({ children }: childrenType) {
	const [dataToEdit, setDataToEdit] = useState<dataToEditType>({ editing: false, id: "" });
	const [inputValue, setInputValue] = useState<string>("");
	const [list, setList] = useState<Array<listType>>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	// * change the input value and determine when is the user editing
	function handleChangeInputValue(value: string, data = { editing: false, id: "" }) {
		setDataToEdit(data);
		setInputValue(value);
	}

	// * Put the reference focus in the input.
	function handleRef() {
		inputRef?.current?.focus();
	}

	// * Create a new task
	function handleCreateTask(title: string) {
		if (title.length === 0) return;
		setList([{ id: crypto.randomUUID(), title, doit: false }, ...list]);
	}

	// ! This function isn't efficient
	function handleCheckTask(id: string) {
		let arrAux = list.map((task) => (task.id === id ? { ...task, doit: !task.doit } : task));
		setList(arrAux);
	}

	// ! This function isn't efficient
	function handleEditTask(id: string, newTitle: string) {
		let arrAux = list.map((task) => (task.id === id ? { ...task, title: newTitle } : task));
		setList(arrAux);
	}

	// ! This function isn't efficient
	function handleDeleteTask(id: string) {
		let arrAux = list.filter((task) => task.id !== id);
		setList(arrAux);
	}

	// * Delete all tasks
	function handleDeleteAllTask() {
		setList([]);
	}

	return (
		<listContext.Provider
			value={{
				inputValue,
				dataToEdit,
				changeInputValue: handleChangeInputValue,

				list,
				inputRef,

				putRefInInput: handleRef,

				createTask: handleCreateTask,

				checkTask: handleCheckTask,
				editTask: handleEditTask,

				deleteTask: handleDeleteTask,
				deleteAllTask: handleDeleteAllTask,
			}}>
			{children}
		</listContext.Provider>
	);
}

export function useListContext() {
	return useContext(listContext);
}
