import { NavLink } from "react-router"
import { useAuthHook } from "../../hooks/useAuthHook"

const LoginPage = () => {
    const { handleAuthLogin, handleSubmit, handleError, register } = useAuthHook()
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <form id="login-form" className="flex flex-col" action="" onSubmit={handleSubmit(handleAuthLogin, handleError)}>
                <input {...register("userName")} className="px-4 py-2" type="text" placeholder="userName" />
                <input {...register("password")} className="px-4 py-2" type="text" placeholder="password" />
                <p>don't  have account?  <NavLink className={`text-blue-500`} to={"/register"}>Register</NavLink></p>
            </form>
            <button form="login-form" type="submit">Login</button>
        </div>
    )
}

export default LoginPage