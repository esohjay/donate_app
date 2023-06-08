import SignUp from "../../components/SignUp";
import SignUpAlt from "../../components/SignUpAlt";
import AddressModal from "../../components/AddressModal";
import { selectViewState } from "../../features/appSlice";
import { useAppSelector } from "../../app/hooks";

import Address from "../../components/Address";

function Register() {
  const view = useAppSelector(selectViewState);

  return (
    <section className=" bg-heroBg bg-no-repeat bg-center bg-cover h-[calc(100vh-64px)] ">
      <section className="h-full bg-black bg-opacity-25 backdrop-blur-sm overflow-auto grid  place-items-center">
        {view === "address" ? (
          <Address />
        ) : view === "password-signup" ? (
          <SignUp />
        ) : view === "social-signup" ? (
          <SignUpAlt />
        ) : null}
      </section>
      <AddressModal />
    </section>
  );
}

export default Register;
