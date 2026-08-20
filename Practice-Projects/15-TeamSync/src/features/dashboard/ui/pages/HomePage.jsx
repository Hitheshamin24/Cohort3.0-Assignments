import React from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";

const HomePage = () => {
  let dispatch = useDispatch();

  return (
    <div>
      HomePage{" "}
      <button onClick={() => dispatch(toggleTheme())}>change theme</button>
    </div>
  );
};

export default HomePage;
