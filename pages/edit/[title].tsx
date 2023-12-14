// pages/edit/[title].tsx
import { useRouter } from "next/router";
import EditTodo from "../EditTodo";

const EditTodoPage = () => {
  const router = useRouter();
  const { title } = router.query;

  if (!title) {
    return <p>Loading...</p>;
  }

  return <EditTodo title={title as string} />;
};

export default EditTodoPage;
