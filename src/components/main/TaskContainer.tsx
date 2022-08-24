import { useEffect, useState } from "react";
import { Task } from "./Task";
import { DeleteAllModal } from "./DeleteModal";
import { listType, useListContext } from "../../context/listContext";

// ! Icons from react-icons
import { AiFillDelete } from "react-icons/ai";

const SHOW_MODE = {
	ALL: 0,
	DONE: 1,
	TODO: 2,
};

export const TaskContainer = () => {
	const [deleteAll, setDeleteAll] = useState<boolean>(false);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showMode, setShowMode] = useState(0);

	const { list, deleteAllTask, dataToEdit } = useListContext();

	function handleDeleteAll() {
		if (dataToEdit.editing) return;
		setShowDeleteModal(true);
	}

	useEffect(() => {
		if (!deleteAll) return;
		deleteAllTask();
		setDeleteAll(false);
	}, [deleteAll]);

	return (
		<section className="flex flex-col gap-y-6 w-full max-w-3xl">
			{list.length === 0 ? (
				<h2 className="text-center longSize font-bold">No items loaded</h2>
			) : (
				<>
					<div className="flex items-center justify-center gap-x-2 sm:gap-x-8 shortSize font-bold">
						<button
							onClick={() => {
								setShowMode(SHOW_MODE.ALL);
							}}
							className={`transition-colors duration-300 ${
								SHOW_MODE.ALL === showMode ? "text-blue-400 italic" : ""
							}`}>
							View all tasks
						</button>
						<button
							onClick={() => {
								setShowMode(SHOW_MODE.DONE);
							}}
							className={`transition-colors duration-300 ${
								SHOW_MODE.DONE === showMode ? "text-blue-400 italic" : ""
							}`}>
							Finished tasks
						</button>
						<button
							onClick={() => {
								setShowMode(SHOW_MODE.TODO);
							}}
							className={`transition-colors duration-300 ${
								SHOW_MODE.TODO === showMode ? "text-blue-400 italic" : ""
							}`}>
							Tasks to do
						</button>
					</div>

					<div className="flex justify-between items-center mediumSize">
						{list.length === 1 ? (
							<h2>There is {list.length} task loaded</h2>
						) : (
							<h2>There are {list.length} tasks loaded</h2>
						)}

						<button
							onClick={handleDeleteAll}
							disabled={dataToEdit?.editing}
							className="flex items-center gap-x-1 border-b-2 border-red-500 hover:text-red-500 transition-colors duration-200 disabled:opacity-50 disabled:hover:text-darkLight">
							<span className="lowShortSize">
								<AiFillDelete />
							</span>
							<small className="italic shortSize">Delete All</small>
						</button>
					</div>

					<ListShow mode={showMode} list={list} />
				</>
			)}

			<DeleteAllModal
				setDeleteAll={setDeleteAll}
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
			/>
		</section>
	);
};

function ListShow({ mode, list }: { mode: number; list: Array<listType> }) {
	if (mode === SHOW_MODE.ALL)
		return (
			<>
				{list.map(({ id, title, doit }) => (
					<Task key={id} title={title} doit={doit} id={id} />
				))}
			</>
		);

	if (mode === SHOW_MODE.DONE)
		return (
			<>
				{list.map(
					({ id, title, doit }) => doit && <Task key={id} title={title} doit={doit} id={id} />
				)}
			</>
		);

	if (mode === SHOW_MODE.TODO)
		return (
			<>
				{list.map(
					({ id, title, doit }) => !doit && <Task key={id} title={title} doit={doit} id={id} />
				)}
			</>
		);

	return <h2 className="text-center longSize font-bold text-red-600">Error</h2>;
}
