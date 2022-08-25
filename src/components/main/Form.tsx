import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useListContext } from "../../context/listContext";

export const Form = () => {
	const inputRef = useRef<HTMLInputElement | null>(null!);

	const {
		inputValue,
		dataToEdit,
		changeInputValue,
		createTask,
		editTask,
		reference,
		putRefInInput,
	} = useListContext();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		if (inputValue.length > 50) return;
		e.preventDefault();

		dataToEdit.editing ? editTask(dataToEdit.id, inputValue) : createTask(inputValue.trim());

		putRefInInput();
		changeInputValue("");
	}

	function handleChangeInputValue(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length > 50) return;
		changeInputValue(e.target.value, dataToEdit);
	}

	// * Put reference in focus.
	useEffect(() => {
		inputRef.current?.focus();
	}, [reference]);

	return (
		<form
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				handleSubmit(e);
			}}
			className="flex gap-3 items-end justify-center lowMediumSize w-full">
			<input
				ref={inputRef}
				type="text"
				maxLength={50}
				placeholder="Task todo"
				className={`bg-inherit border-b-2 outline-none w-full max-w-xl placeholder:italic ${
					inputValue.length > 50 ? "border-red-600" : "border-emerald-500"
				}`}
				value={inputValue}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					handleChangeInputValue(e);
				}}
			/>
			<input
				type="submit"
				value={`${dataToEdit?.editing ? "Edit task" : "Add task"}`}
				disabled={inputValue.length < 3}
				className="font-bold cursor-pointer lg:hover:scale-105 lg:transition-transform lg:duration-200 bg-emerald-500 border-b-2 border-emerald-500 rounded-md text-darkDark py-1 px-2 md:py-2 md:px-3 disabled:opacity-50 disabled:cursor-default disabled:hover:scale-100"
			/>
		</form>
	);
};
