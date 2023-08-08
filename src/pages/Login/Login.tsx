import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../redux/features/user/userApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setUser } from "../../redux/features/user/userSlice";
import { useEffect } from 'react'

interface LoginFormInput {
    email: string,
    password: string
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { email } = useAppSelector(state => state.user)
    const [login] = useUserLoginMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    useEffect(() => {
        console.log(email)
        console.log(from)
        if (email) {
            navigate(from, { replace: true })
        }
    }, [email])

    const handleLogin = async (data: LoginFormInput) => {
        const result: any = await login(data)
        if (result?.data?.statusCode === 200) {
            console.log(result)
            dispatch(setUser(result?.data?.data))
            navigate('/')
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col justify-center items-center">
                <div className="font-bold text-3xl">
                    Login now!
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register('email', { required: "Email is required" })} />

                            </div>
                            {errors.email && <p>{errors?.email?.message}</p>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" {...register('password', { required: "Password is required" })} />
                            </div>
                            {errors.password && <p>{errors?.password?.message}</p>}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div>Don't have an account? <Link to={'/signup'}>Sign Up</Link></div>
            </div>
        </div>
    );
};

export default Login;