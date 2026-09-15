import { useEffect } from "react";
import { useApi } from "./shared/apiClient";
import AppRoutes from "./shared/AppRoutes";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const api = useApi();
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAutoLogin = async () => {
      let res = await api.get("/auth/me");
    };
    checkAutoLogin();
  }, [accessToken]);
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
