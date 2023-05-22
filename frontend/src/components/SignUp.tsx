import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeView } from "../features/appSlice";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { SignupInputs } from "../type";
import { useNavigate } from "react-router-dom";
// import { useRegisterUserMutation } from "../api/auth";

import {
  signUpWithEmailAndPassword,
  authenticateWithGoogle,
  authenticateWithFacebook,
  authenticateWithTwitter,
  selectWktCoordinates,
  selectToken,
  selectUser,
  getToken,
} from "../features/authSlice";

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cordinateError, setCordinateError] = useState(false);
  // const [registerUser, { isSuccess }] = useRegisterUserMutation();

  const cordinates = useAppSelector(selectWktCoordinates);
  const token = useAppSelector(selectToken);
  const dbUser = useAppSelector(selectUser);

  const { user, provider } = useAuth();

  const {
    register: registerFields,
    handleSubmit: handleSubmitForm,
    formState: { errors: formErrors },
  } = useForm<SignupInputs>();
  const onSubmitForm: SubmitHandler<SignupInputs> = (data) => {
    if (!cordinates) {
      setCordinateError(true);
      return;
    }

    dispatch(
      signUpWithEmailAndPassword({
        ...data,
        cordinates,
      })
    );
  };
  const handleGoogleOpt = () => {
    if (!cordinates) {
      setCordinateError(true);
      return;
    }
    dispatch(authenticateWithGoogle());
  };
  const handleFacebookOpt = () => {
    if (!cordinates) {
      setCordinateError(true);
      return;
    }
    dispatch(authenticateWithFacebook());
  };
  const handleTwitterOpt = () => {
    if (!cordinates) {
      setCordinateError(true);
      return;
    }
    dispatch(authenticateWithTwitter());
  };
  useEffect(() => {
    // if the provider is not password, change screen to where user can complete their details else register user
    if (user && provider !== "password") {
      dispatch(changeView("social-signup"));
    } else if (user && provider === "password" && dbUser) {
      setTimeout(() => navigate(`items`), 3000);
    }
  }, [provider, user, navigate, dispatch, dbUser]);
  console.log(user);

  return (
    <article className="bg-white p-5 rounded-md ">
      <h3 className="text-center text-mainColor uppercase text-2xl font-semibold md:text-4xl mb-5">
        Register
      </h3>

      <form onSubmit={handleSubmitForm(onSubmitForm)}>
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
            {...registerFields("fname", { required: true })}
          />
          {formErrors.fname && <span>First name is required</span>}
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
            {...registerFields("lname", { required: true })}
          />
          {formErrors.lname && <span>Last name is required</span>}
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
            {...registerFields("email", { required: true })}
          />
          {formErrors.email && <span>Email is required</span>}
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="phone"
            className="block text-mainColor font-semibold mb-3"
          >
            Phone
          </label>
          <input
            type="text"
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...registerFields("phone", { required: true })}
          />
          {formErrors.phone && <span>Phone number is required</span>}
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
            {...registerFields("password", { required: true })}
          />
          {formErrors.password && <span>Password is required</span>}
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="confirmPassword"
            className="block text-mainColor font-semibold mb-3"
          >
            Confirm password
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:border-mainColor focus:border-2 focus:outline-none text-mainColor text-base"
            type="password"
            {...registerFields("confirmPassword", { required: true })}
          />
          {formErrors.confirmPassword && (
            <span> confrim password is required</span>
          )}
        </div>
        <button className="inline-block bg-mainColor capitalize text-white rounded-md py-1 px-4  font-medium">
          submit
        </button>
        {cordinateError && (
          <span className="text-sm text-red-500 block py-3">
            Select your location before you proceed
          </span>
        )}
      </form>
      <p className="text-center mt-3 text-mainColor font-semibold text-lg mb-3 capitalize">
        or sign up with
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleGoogleOpt}
          className="inline-block text-lg md:text-2xl p-3 rounded-md shadow-md bg-white"
        >
          <FcGoogle />
        </button>
        <button
          onClick={handleFacebookOpt}
          className="inline-block text-lg md:text-2xl p-3 rounded-md shadow-md text-blue-700 bg-white"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={handleTwitterOpt}
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
