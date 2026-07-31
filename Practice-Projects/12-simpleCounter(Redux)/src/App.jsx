import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./counter/counterSlice";

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[350px] text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Redux Counter
        </h1>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => dispatch(decrement())}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white text-3xl font-bold transition-all duration-200"
          >
            −
          </button>

          <div className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-800 shadow-inner">
            {count}
          </div>

          <button
            onClick={() => dispatch(increment())}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 text-white text-3xl font-bold transition-all duration-200"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;