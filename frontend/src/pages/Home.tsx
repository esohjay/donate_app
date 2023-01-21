import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { selectViewState } from "../features/app/appSlice";
import { useAppSelector } from "../app/hooks";
function Home() {
  const view = useAppSelector(selectViewState);
  return (
    <section className="min-h-screen bg-no-repeat bg-center px-5 py-10 bg-cover flex justify-center items-center bg-heroBg">
      <article className="w-full max-w-md ">
        {/* <p>share with your padi</p> */}
        {view ? <Login /> : <SignUp />}
      </article>
    </section>
  );
}

export default Home;
