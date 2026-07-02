import React, { useState } from "react";
import Tasks from "./Tasks";

const App = () => {
  const [taskInput, setTaskInput] = useState("");
  const [task, setTask] = useState([]);
  const addTask = (e) => {
    e.preventDefault();
    setTask([...task, taskInput]);
    setTaskInput("");
  };
  const deleteTask = (idx) => {
    const updatedTask = task.filter((e, index) => index !== idx);
    setTask(updatedTask);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-100">
      <div className="flex justify-center items-center h-72">
        <form className="flex gap-3 bg-white p-4 rounded-2xl shadow-lg w-[90%] max-w-xl">
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            type="text"
            placeholder="Enter your task..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            onClick={(e) => {
              addTask(e);
            }}
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
            <Tasks key={idx} index={idx} deleteFun={deleteTask} task={elem} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
