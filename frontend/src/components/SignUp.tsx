import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeView } from "../features/appSlice";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { SignupInputs } from "../type";
import { useNavigate } from "react-router-dom";
import communityImg from "../assets/community.png";
// import { useRegisterUserMutation } from "../api/auth";

import {
  signUpWithEmailAndPassword,
  authenticateWithGoogle,
  authenticateWithFacebook,
  authenticateWithTwitter,
  selectWktCoordinates,
  selectUser,
} from "../features/authSlice";

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cordinateError, setCordinateError] = useState(false);
  // const [registerUser, { isSuccess }] = useRegisterUserMutation();

  const cordinates = useAppSelector(selectWktCoordinates);

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
      dispatch(changeView("address"));
    }
    dispatch(authenticateWithGoogle());
    console.log("google");
  };
  const handleFacebookOpt = () => {
    if (!cordinates) {
      dispatch(changeView("address"));
    }
    dispatch(authenticateWithFacebook());
  };
  const handleTwitterOpt = () => {
    if (!cordinates) {
      dispatch(changeView("address"));
    }
    dispatch(authenticateWithTwitter());
  };
  useEffect(() => {
    // if the provider is not password, change screen to where user can complete their details else register user
    if (user && provider !== "password") {
      dispatch(changeView("social-signup"));
    } else if (user && provider === "password" && dbUser) {
      setTimeout(() => navigate(`/items`), 3000);
    }
  }, [provider, user, navigate, dispatch, dbUser]);

  useEffect(() => {
    if (!cordinates) {
      dispatch(changeView("address"));
    }
  }, [cordinates, dispatch]);
  console.log(user);

  return (
    <article className="p-3 lg:flex  lg:gap-x-10 items-center justify-between lg:px-24">
      <article className="w-full lg:w-1/2 bg-white p-3 rounded-md ">
        <h3 className="text-center text-mainColor uppercase text-lg font-semibold md:text-2xl mb-5">
          Create your account
        </h3>
        <form onSubmit={handleSubmitForm(onSubmitForm)}>
          <article className="grid grid-cols-2 gap-x-2">
            <div className="mb-3 ">
              <label
                htmlFor="fname"
                className="block text-mainColor font-semibold mb-1"
              >
                First name
              </label>
              <input
                className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
                {...registerFields("fname", { required: true })}
              />
              {formErrors.fname && (
                <span className="text-red-500">First name is required</span>
              )}
            </div>
            <div className="mb-3 ">
              <label
                htmlFor="lname"
                className="block text-mainColor font-semibold mb-1"
              >
                Last name
              </label>
              <input
                className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
                {...registerFields("lname", { required: true })}
              />
              {formErrors.lname && (
                <span className="text-red-500 text-xs">
                  Last name is required
                </span>
              )}
            </div>
          </article>
          <article className="grid md:grid-cols-2 gap-x-2">
            <div className="mb-3 ">
              <label
                htmlFor="email"
                className="block text-mainColor font-semibold mb-1"
              >
                Email
              </label>
              <input
                className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
                {...registerFields("email", { required: true })}
              />
              {formErrors.email && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
            </div>
            <div className="mb-3 ">
              <label
                htmlFor="phone"
                className="block text-mainColor font-semibold mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
                {...registerFields("phone", { required: true })}
              />
              {formErrors.phone && (
                <span className="text-red-500 text-xs">
                  Phone number is required
                </span>
              )}
            </div>
          </article>
          <article className="grid md:grid-cols-2 gap-x-2">
            <div className="mb-3 ">
              <label
                htmlFor="password"
                className="block text-mainColor font-semibold mb-1"
              >
                Password
              </label>
              <input
                className="block p-2 border rounded-md w-full focus:border-mainColor focus:border-2 focus:outline-none text-mainColor text-base"
                type="password"
                {...registerFields("password", { required: true })}
              />
              {formErrors.password && (
                <span className="text-red-500 text-xs">
                  Password is required
                </span>
              )}
            </div>
            <div className="mb-3 ">
              <label
                htmlFor="confirmPassword"
                className="block text-mainColor font-semibold mb-1"
              >
                Confirm password
              </label>
              <input
                className="block p-2 border rounded-md w-full focus:border-mainColor focus:border-2 focus:outline-none text-mainColor text-base"
                type="password"
                {...registerFields("confirmPassword", { required: true })}
              />
              {formErrors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {" "}
                  confrim password is required
                </span>
              )}
            </div>
          </article>
          <button
            disabled={!cordinates}
            className="inline-block bg-mainColor capitalize text-white rounded-md py-1 px-4  font-medium"
          >
            submit
          </button>
          {cordinateError && (
            <span className="text-sm text-red-500 block py-1">
              Select your location before you proceed
            </span>
          )}
        </form>
        <p className="text-center my-2 text-mainColor font-semibold text-lg  capitalize">
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
          <button className="font-medium" onClick={() => navigate("/login")}>
            Already have an account?{" "}
            <span className="text-mainColor">Login</span>
          </button>
        </div>
      </article>
      <figure className="h-[350px] w-1/2 hidden lg:block">
        <img
          src={communityImg}
          alt=""
          className="h-full w-full max-h-full max-w-full"
        />
      </figure>
    </article>
  );
}

export default SignUp;
