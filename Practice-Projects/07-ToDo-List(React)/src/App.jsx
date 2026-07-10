import React, { useState } from "react";
import Tasks from "./Tasks";
import { useForm } from "react-hook-form";
const App = () => {
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const [updatedData, setUpdatedData] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
   
  });
  const setToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const editTask=(data)=>{
    setUpdatedData(data)
    reset(data)
  }
  const addTask = (data) => {
    const exist = task.some((val) => val.tasks === data.tasks);
    if (exist) return;
    if (updatedData) {
      let updateTask = task.map((t) =>
        t.id === updatedData.id ? { ...data, id: updatedData.id } : t,
      );
      setTask(updateTask);
      return;
    }
    let updatedTask = [...task, { ...data, id: Date.now() }];
    console.log(updatedTask);

    setTask(updatedTask);
    setToLocalStorage("tasks", updatedTask);

    reset();
  };
  const deleteTask = (id) => {
    const updatedTask = task.filter((e) => e.id !== id);
    setTask(updatedTask);
    setToLocalStorage("tasks", updatedTask);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100">
      <div className="flex justify-center items-center h-72">
        <form
          onSubmit={handleSubmit(addTask)}
          className="flex gap-3 bg-white p-4 rounded-2xl shadow-lg w-[90%] max-w-xl"
        >
          <input
            {...register("tasks", {
              required: "Task is required",
            })}
            type="text"
            placeholder="Enter your task..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.tasks && (
            <p className="text-red-500">{errors.tasks.message}</p>
          )}{" "}
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 cursor-pointer"
          >
            Add Task
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center gap-4 pb-10">
        {task.map((elem, idx) => {
          return (
            <Tasks
              key={elem.id}
              index={idx}
              deleteFun={deleteTask}
              task={elem}
              editTask={editTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
