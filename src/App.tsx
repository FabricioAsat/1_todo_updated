import { Layout } from "./components/layout/Layout";
import { Form } from "./components/main/Form";
import { TaskContainer } from "./components/main/TaskContainer";

function App() {
	return (
		<Layout>
			<Form />
			<TaskContainer />
		</Layout>
	);
}

export default App;
