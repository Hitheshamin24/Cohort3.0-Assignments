import React from 'react'

const Tasks = ({deleteFun,task,editTask}) => {
  return (
    <div className="w-[90%] max-w-3xl bg-white shadow-md rounded-xl px-6 py-5 flex justify-between items-center hover:shadow-xl transition">
              <p className="text-lg font-medium text-gray-700">{task.tasks}</p>

              <button
                onClick={() => {
                    deleteFun(task.id)
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  editTask(task)
              
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
              >
                Update
              </button>
            </div>
  )
}

export default Tasks
