import { useIsDarkContext } from "../../context/darkContext";

type deleteAll = {
	setDeleteAll: React.Dispatch<React.SetStateAction<boolean>>;
	setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	showDeleteModal: boolean;
};

export const DeleteAllModal = ({
	setDeleteAll,
	setShowDeleteModal,
	showDeleteModal,
}: deleteAll) => {
	const { isDarkMode } = useIsDarkContext();

	function handleModal(option: boolean) {
		setDeleteAll(option);
		setShowDeleteModal(false);
	}

	return (
		<div
			className={`fixed top-0 left-0 flex items-center h-full w-full px-6 my-auto transition-transform duration-200 ease-linear ${
				isDarkMode ? "bg-black/75" : "bg-black/75"
			} ${showDeleteModal ? "scale-100" : "scale-0"}`}>
			<div
				className={`flex flex-col items-center justify-between py-6 text-darkLight bg-lightLight w-full max-w-2xl h-60 m-auto rounded-xl longSize`}>
				<div className="text-center">
					<h3 className="font-bold">Are you sure?</h3>
					<small className="italic shortSize">All data will be lost.</small>
				</div>

				<div className="flex justify-between w-full max-w-sm mediumSize px-4">
					<button
						className="font-bold text-red-600"
						onClick={() => {
							handleModal(true);
						}}>
						Delete All
					</button>
					<button
						className="font-bold text-blue-400"
						onClick={() => {
							handleModal(false);
						}}>
						Back
					</button>
				</div>
			</div>
		</div>
	);
};
