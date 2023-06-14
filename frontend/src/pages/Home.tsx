import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <section className=" bg-heroBg bg-no-repeat h-screen bg-center bg-cover">
      <section className="h-full bg-black bg-opacity-25 backdrop-blur-sm overflow-auto grid  place-items-center">
        <article className="py-6 px-5 flex flex-col items-center justify-center gap-5 bg-white rounded-md shadow-md">
          <h3 className=" text-mainColor text-2xl font-semibold">Welcome!</h3>
          <p>Your local sharing platform</p>
          <button
            className="py-1 px-6 bg-mainColor text-white rounded-md shadow-md shadow-mainColor"
            onClick={() => navigate("login")}
          >
            Get started
          </button>
        </article>
      </section>
    </section>
  );
}

export default Home;
