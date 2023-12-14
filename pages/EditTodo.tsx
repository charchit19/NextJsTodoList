// EditTodo.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./nav";
import { useRouter } from "next/navigation";
import Head from "next/head";

interface EditTodoProps {
  title: string;
}

const EditTodo: React.FC<EditTodoProps> = ({ title }) => {
  const router = useRouter();
  const [editedTodo, setEditedTodo] = useState({
    title,
    desc: "", // Provide a default value or fetch the existing description
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else {
      alert("Login first");
      router.push("/login"); // Set username to an empty string when the token is not present
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleEditTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put("/api/editTodo", {
        token,
        title: editedTodo.title,
        editedTodo: { ...editedTodo },
      });

      alert(response.data.message);
      router.push("/mytodos");
      // Handle successful edit, e.g., redirect or update state
    } catch (error) {
      console.error("Error editing todo:", error);
      alert("Error editing todo. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>
          Edit Todo
        </title>
      </Head>
      <Nav />
      <section>
        <div className="flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 mt-10">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit a Todo
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="title"
                    name="title"
                    value={editedTodo.title}
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="desc"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="desc"
                    name="desc"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleEditTodo}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Edit Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditTodo;
