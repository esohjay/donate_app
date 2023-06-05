import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import useAuth from "../hooks/useAuth";
import { selectWktCoordinates } from "../features/authSlice";
import { useRegisterUserMutation } from "../api/auth";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  lname: string;
  phone: string;
  cordinates: string;
};
function SignUpAlt() {
  const { user } = useAuth();
  const [cordinateError, setCordinateError] = useState(false);
  const navigate = useNavigate();
  const cordinates = useAppSelector(selectWktCoordinates);
  const [registerUser, { isSuccess }] = useRegisterUserMutation();

  console.log(user);

  const {
    register: registerFields1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: formErrors1 },
  } = useForm<Inputs>();
  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    if (!cordinates) {
      setCordinateError(true);
      return;
    }
    const splitName = data.fullname.split(" ");
    registerUser({
      fname: splitName[0],
      lname: splitName[1],
      email: data.email,
      phone: data.phone,
      cordinates,
      password: "",
      uid: user?.uid,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate(`/items`);
    }
  }, [isSuccess]);
  return (
    <article className="bg-white p-5 rounded-md ">
      <h3 className="text-center text-mainColor uppercase text-2xl font-semibold md:text-4xl mb-5">
        Complete your registration
      </h3>

      <form onSubmit={handleSubmitForm1(onSubmitForm)}>
        <div className="mb-5 ">
          <label
            htmlFor="fullName"
            className="block text-mainColor font-semibold mb-3"
          >
            Fullname
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...registerFields1("fullname", {
              required: true,
              value: `${user?.fullname}`,
            })}
          />
          {formErrors1.fullname && <span>Full name is required</span>}
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
            {...registerFields1("email", {
              required: true,
              value: `${user?.email}`,
            })}
          />
          {formErrors1.email && <span>Email is required</span>}
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
            {...registerFields1("phone", {
              required: true,
              value: `${user?.phoneNumber ? user?.phoneNumber : ""}`,
            })}
          />
          {formErrors1.phone && <span>Phone number is required</span>}
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
    </article>
  );
}

export default SignUpAlt;
