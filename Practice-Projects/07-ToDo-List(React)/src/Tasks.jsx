import React from 'react'

const Tasks = ({index,deleteFun,task}) => {
  return (
    <div className="w-[90%] max-w-3xl bg-white shadow-md rounded-xl px-6 py-5 flex justify-between items-center hover:shadow-xl transition">
              <p className="text-lg font-medium text-gray-700">{task}</p>

              <button
                onClick={() => {
                    deleteFun(index)
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
              >
                Delete
              </button>
            </div>
  )
}

export default Tasks
