import LOGO from "../assets/logo.png";
import HeroImg from "../assets/heros.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${HeroImg})`,
    }} className="bg-cover bg-center h-screen pt-8 w-full  bg-red-400 flex justify-between flex-col">
      <img className="w-16 ml-8" src={LOGO} alt="" />
      <div className="bg-white pb-7 py-4 px-4
      ">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
      </div>
    </div>
  )
}
export default Home