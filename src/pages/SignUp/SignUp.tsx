/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useUserLoginMutation, useUserSignUpMutation } from "../../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/user/userSlice";

interface SignUpFormInput {
    email: string,
    password: string
}

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInput>()
    const [login] = useUserLoginMutation()
    const [signUp] = useUserSignUpMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleSignUp = async (data: SignUpFormInput) => {
        const payload = {
            ...data,
            role: 'user'
        }
        const result: any = await signUp(payload)
        if (result?.data?.statusCode === 200) {
            console.log(result)
            const res: any = await login(data)
            dispatch(setUser(res?.data?.data))
            navigate('/')
        }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col justify-center items-center">
                <div className="font-bold text-3xl">
                    Sign Up!
                </div>
                <form onSubmit={handleSubmit(handleSignUp)}>
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
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;