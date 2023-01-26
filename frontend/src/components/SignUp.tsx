import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeView } from "../features/appSlice";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

import {
  signUpWithEmailAndPassword,
  authenticateWithGoogle,
  authenticateWithFacebook,
  authenticateWithTwitter,
  selectWktCoordinates,
} from "../features/authSlice";
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  fname: string;
  lname: string;
  phone: number;
  coordinates: string;
};

function SignUp() {
  const dispatch = useAppDispatch();

  const coordinates = useAppSelector(selectWktCoordinates);

  const user = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!coordinates) {
      setError("coordinates", { type: "required" });
      return;
    }
    dispatch(
      signUpWithEmailAndPassword({
        email: data.email,
        password: data.password,
      })
    );
  };
  console.log(user);
  return (
    <article className="bg-white p-5 rounded-md ">
      <h3 className="text-center text-mainColor uppercase text-2xl font-semibold md:text-4xl mb-5">
        Register
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 ">
          <label
            htmlFor="fname"
            className="block text-mainColor font-semibold mb-3"
          >
            First name
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...register("fname", { required: true })}
          />
          {errors.fname && <span>First name is required</span>}
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="lname"
            className="block text-mainColor font-semibold mb-3"
          >
            Last name
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...register("lname", { required: true })}
          />
          {errors.lname && <span>Last name is required</span>}
        </div>
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
            htmlFor="phone"
            className="block text-mainColor font-semibold mb-3"
          >
            Phone
          </label>
          <input
            type="tel"
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span>Phone number is required</span>}
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
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && <span>Password is required</span>}
        </div>
        <button className="inline-block bg-mainColor capitalize text-white rounded-md py-1 px-4  font-medium">
          submit
        </button>
      </form>
      <p className="text-center mt-3 text-mainColor font-semibold text-lg mb-3 capitalize">
        or sign up with
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
          onClick={() => dispatch(changeView("login"))}
        >
          Already have an account? <span className="text-mainColor">Login</span>
        </button>
      </div>
    </article>
  );
}

export default SignUp;
