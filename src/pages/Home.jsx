import Login from "../auth/Login";
import Container from "../components/layout/Container";

const Home = () => {
  return (
    <Container>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="p-10 bg-emerald-900 rounded-lg w-full max-w-xl">
          <Login />
        </div>
      </div>
    </Container>
  );
};
export default Home;
