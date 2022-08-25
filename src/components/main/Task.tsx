// ! Contexts
import { useIsDarkContext } from "../../context/darkContext";
import { listType, useListContext } from "../../context/listContext";

// ! Icons from react-icons
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { BsBookmarkXFill, BsBookmarkCheckFill } from "react-icons/bs";

export const Task = ({ title, id, doit }: listType) => {
	const { isDarkMode } = useIsDarkContext();
	const { putRefInInput, deleteTask, changeInputValue, checkTask, dataToEdit } = useListContext();

	function handleEdit() {
		changeInputValue(title, { editing: true, id });
		putRefInInput();
	}

	// TODO
	function handleDelete() {
		deleteTask(id);
	}

	return (
		<article
			className={`flex justify-between w-full py-2 pr-2 rounded-md ${
				isDarkMode ? "bg-lightLight/10" : "bg-darkDark/10"
			}`}>
			<div className="flex items-center w-full">
				<div className="flex flex-col items-center justify-center lowMediumSize px-1">
					{doit ? (
						<button
							onClick={() => checkTask(id)}
							className="px-2 flex flex-col justify-between items-center">
							<BsBookmarkCheckFill color="rgb(74 222 128)" />
						</button>
					) : (
						<button
							onClick={() => checkTask(id)}
							className="px-2 flex flex-col justify-between items-center">
							<BsBookmarkXFill color="rgb(220 38 38)" />
						</button>
					)}
				</div>

				<input
					className={`italic tinySize font-bold w-full bg-inherit ${
						dataToEdit.editing && dataToEdit.id === id ? "text-blue-400" : "text-inherit"
					} ${doit ? "line-through decoration-green-500 decoration-2" : ""}`}
					disabled={true}
					value={
						dataToEdit.editing && dataToEdit.id === id
							? "Editing..."
							: title.charAt(0).toUpperCase() +
							  title.slice(1, title.length).toLocaleLowerCase() +
							  (title.charAt(title.length - 1) === "." ? "" : ".")
					}
				/>
			</div>

			<div className="flex gap-x-3">
				<button
					onClick={handleEdit}
					className="mediumSize p-1 text-blue-400 active:scale-105 disabled:opacity-50"
					disabled={doit}>
					<AiOutlineEdit />
				</button>
				<button
					onClick={handleDelete}
					className="p-1 mediumSize text-red-600 active:scale-105 disabled:opacity-50"
					disabled={dataToEdit.editing && dataToEdit.id === id}>
					<AiFillDelete />
				</button>
			</div>
		</article>
	);
};
