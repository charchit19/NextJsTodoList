"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./nav";
import Head from "next/head";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [todo, setTodo] = useState({ title: "", desc: "" });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/login", { params: { token } })
        .then((response) => response.data)
        .then((data) => setUserName(data.username))
        .catch((error: any) => {
          console.error("Error fetching user information:", error);
        });
    } else {
      setUserName("");
      alert("Login first");
      router.push("/login");
    }
  }, []);

  const addTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/addTodo", {
        token,
        title: todo.title,
        desc: todo.desc,
      });
      alert(response.data.message);
      setTodo({ title: "", desc: "" });
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("Todo with this title already exists");
      } else {
        console.error("Error adding todo:", error);
        alert("Error adding todo. Please try again.");
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Nav />
      <div>
        <section>
          <div className="flex flex-col items-center px-6 py-8 mx-auto h-screen lg:py-0 mt-10">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              {userName}
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Add a Todo
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Todo Title
                    </label>
                    <input
                      onChange={onChange}
                      value={todo.title}
                      type="text"
                      id="title"
                      name="title"
                      required
                      placeholder="Meeting!!"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="desc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Todo Description
                    </label>
                    <input
                      onChange={onChange}
                      value={todo.desc}
                      type="text"
                      id="desc"
                      name="desc"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Meeting with my boss at 11 AM"
                    />
                  </div>
                  <button
                    onClick={addTodo}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add Todo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
