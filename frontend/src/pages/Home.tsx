import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <section className=" bg-heroBg bg-no-repeat bg-center bg-cover">
      <button onClick={() => navigate("login")}>Login</button>
    </section>
  );
}

export default Home;
