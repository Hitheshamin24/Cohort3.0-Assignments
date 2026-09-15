import { NavLink } from "react-router"
import { useAuthHook } from "../../hooks/useAuthHook"

const RegisterPage = () => {
    const {handleAuthRegistration,handleSubmit,handleError,register}=useAuthHook()
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <form id="register-form" className="flex flex-col" action="" onSubmit={handleSubmit(handleAuthRegistration,handleError)}>
                <input {...register("userName")}  className="px-4 py-2" type="text" placeholder="userName" />
                <input {...register("password")} className="px-4 py-2" type="text" placeholder="password" />
                <p>alredy  have account?  <NavLink className={`text-blue-500`} to={"/login"}>login</NavLink></p>
            </form>
            <button form="register-form" type="submit">register</button>
        </div>
    )
}

export default RegisterPage