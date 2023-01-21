import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../app/hooks";
import { changeView } from "../features/app/appSlice";

type Inputs = {
  email: String;
  password: String;
};
function Login() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
          {errors.email && <span>Email is required</span>}
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
          {errors.password && <span>Password is required</span>}
        </div>
        <button className="inline-block bg-mainColor capitalize text-white rounded-md py-1 px-4  font-medium">
          submit
        </button>
      </form>
      <div className="text-center mt-3">
        <button className="font-medium" onClick={() => dispatch(changeView())}>
          Don't have an account? <span className="text-mainColor">Sign up</span>
        </button>
      </div>
    </article>
  );
}

export default Login;