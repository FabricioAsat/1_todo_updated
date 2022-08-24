import { Layout } from "./components/layout/Layout";
import { Form } from "./components/main/Form";
import { TaskContainer } from "./components/main/TaskContainer";
import { useListContext } from "./context/listContext";

function App() {
	const { list } = useListContext();

	return (
		<Layout>
			<Form />
			<TaskContainer />
		</Layout>
	);
}

export default App;
