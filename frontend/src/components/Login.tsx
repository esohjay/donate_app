import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../app/hooks";
import { changeView } from "../features/appSlice";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import {
  logInWithEmailAndPassword,
  authenticateWithGoogle,
  authenticateWithFacebook,
  authenticateWithTwitter,
} from "../features/authSlice";
import useAuth from "../hooks/useAuth";

type Inputs = {
  email: string;
  password: string;
};
function Login() {
  const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUser);
  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      logInWithEmailAndPassword({
        email: data.email,
        password: data.password,
      })
    );
  };
  console.log(user);
  return (
    <article className="bg-white p-5 rounded-md ">
      <h3 className="text-center text-mainColor uppercase text-2xl font-semibold md:text-4xl mb-5">
        login
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 ">
          <label
            htmlFor="email"
            className="block text-mainColor font-semibold mb-3"
          >
            Email
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
            focus:border-mainColor focus:border-2"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="password"
            className="block text-mainColor font-semibold mb-3"
          >
            Password
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:border-mainColor focus:border-2 focus:outline-none text-mainColor text-base"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        <button
          className="inline-block bg-mainColor capitalize text-white rounded-md py-1 px-4 
         font-medium hover:bg-altColor duration-500 transition-all"
        >
          submit
        </button>
      </form>
      <p className="text-center mt-3 text-mainColor font-semibold text-lg mb-3 capitalize">
        or log in with
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => dispatch(authenticateWithGoogle())}
          className="inline-block text-lg md:text-2xl p-3 rounded-md shadow-md bg-white"
        >
          <FcGoogle />
        </button>
        <button
          onClick={() => dispatch(authenticateWithFacebook())}
          className="inline-block text-lg md:text-2xl p-3 rounded-md shadow-md text-blue-700 bg-white"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={() => dispatch(authenticateWithTwitter())}
          className="inline-block text-lg md:text-2xl p-3 rounded-md shadow-md text-blue-400 bg-white"
        >
          <FaTwitter />
        </button>
      </div>
      <div className="text-center mt-3">
        <button
          className="font-medium"
          onClick={() => dispatch(changeView("signup"))}
        >
          Don't have an account? <span className="text-mainColor">Sign up</span>
        </button>
      </div>
    </article>
  );
}

export default Login;
